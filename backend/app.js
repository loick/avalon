import express from 'express'
import { ACTION_NAMES, ERRORS, PORT } from '../mobile/config'
import { getPlayersOnGame, MIN_NB_PLAYERS } from './player'
import { AVAILABLE_ROLES_PER_NB_PLAYERS } from './roles'
import Game from './class/Game'
import Player from './class/Player'

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const games = {}

io.on('connection', socket => {
  const user = new Player()
  socket.user = user
  console.log('User connected: ', user.toObject())

  socket.on(ACTION_NAMES.PLAYER_NAME, ({ name }, callback) => {
    socket.user.setUsername(name)
    console.log('< player_name: ', socket.user.toObject())

    callback({ player: socket.user.toObject() })
  })

  socket.on(ACTION_NAMES.NEW_GAME, (_, callback) => {
    const game = new Game()
    game.setGameMaster(socket.id)
    games[game.invite_code] = game

    socket.join(game.id)
    socket.game = game

    const playerList = getPlayersOnGame(io.sockets, game.id)
    io.in(game.id).emit(ACTION_NAMES.PLAYER_LIST, playerList)

    console.log('< new_game: ', socket.user.toObject())

    callback({
      player: socket.user.toObject(),
      game: game.gameDetails(socket.id),
    })
  })

  socket.on(ACTION_NAMES.JOIN_GAME, ({ invite_code }, callback) => {
    if (!(invite_code in games)) {
      callback({ error: ERRORS.GAME_NOT_EXIST })
      return
    }

    const game = games[invite_code]
    socket.join(game.id)

    const playerList = getPlayersOnGame(io.sockets, game.id)
    io.in(game.id).emit(ACTION_NAMES.PLAYER_LIST, playerList)

    console.log('< join_game: ', socket.user.toObject())
    callback({
      player: socket.user.toObject(),
      game: game.gameDetails(socket.id),
    })
  })

  socket.on(ACTION_NAMES.START_ROLE_SETUP, (_, callback) => {
    if (!socket.game.isGameMaster(socket.user.id)) {
      callback({ error: ERRORS.USER_IS_NOT_GAME_MASTER })
      return
    }

    const playerList = getPlayersOnGame(io.sockets, socket.game.id)

    if (playerList.length < MIN_NB_PLAYERS) {
      callback({ error: ERRORS.NOT_ENOUGH_PLAYERS })
      return
    }

    const roles = AVAILABLE_ROLES_PER_NB_PLAYERS[playerList.length]
    roles.sort(() => 0.5 - Math.random())

    playerList.forEach(player => {
      player.role = roles.pop()
      console.log('< receive_role: ', player.user.toObject())
      player.emit(ACTION_NAMES.RECEIVE_ROLE, player.user.toObject())
    })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.user.id)
    if (socket.game) {
      if (socket.game.isGameMaster(socket.user.id)) {
        // TODO: If the user is the master, kill the room
      }

      const playerList = getPlayersOnGame(io.sockets, socket.game.id)
      io.in(socket.game.id).emit(ACTION_NAMES.PLAYER_LIST, playerList)
    }
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
