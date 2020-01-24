import uuid from 'uuid/v4'
import express from 'express'
import { ACTION_NAMES, ERRORS, PORT } from '../mobile/config'
import { getPlayerSummary, getPlayersOnGame, MIN_NB_PLAYERS } from './player'
import { AVAILABLE_ROLES_PER_NB_PLAYERS, Role } from './roles'

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const games = {}

function generateInviteCode() {
  return Math.random()
    .toString(36)
    .substr(2)
    .toUpperCase()
    .substring(0, 4)
}

io.on('connection', socket => {
  socket.user_id = uuid()
  socket.user_name = ''
  socket.game_id = null
  socket.game_invite_code = null
  socket.is_game_master = false
  socket.role = null
  console.log('User connected: ', socket.user_id)

  socket.on(ACTION_NAMES.PLAYER_NAME, ({ name }, callback) => {
    socket.user_name = name
    const response = getPlayerSummary(socket)
    console.log('< player_name: ', response)
    callback(response)
  })

  socket.on(ACTION_NAMES.NEW_GAME, (_, callback) => {
    const new_game_id = uuid()

    let new_invite_code
    do {
      new_invite_code = generateInviteCode()
    } while (new_invite_code in games)
    games[new_invite_code] = new_game_id

    socket.join(new_game_id)
    socket.game_id = new_game_id
    socket.game_invite_code = new_invite_code
    socket.is_game_master = true

    const playerList = getPlayersOnGame(io.sockets, socket.game_id)
    io.in(new_game_id).emit(ACTION_NAMES.PLAYER_LIST, playerList)

    const response = getPlayerSummary(socket)
    console.log('< new_game: ', response)

    callback(response)
  })

  socket.on(ACTION_NAMES.JOIN_GAME, ({ invite_code }, callback) => {
    if (!(invite_code in games)) {
      callback({ error: ERRORS.GAME_NOT_EXIST })
      return
    }

    const game_id = games[invite_code]
    socket.join(game_id)
    socket.game_id = game_id
    socket.game_invite_code = invite_code
    socket.is_game_master = false

    const playerList = getPlayersOnGame(io.sockets, socket.game_id)
    io.in(game_id).emit(ACTION_NAMES.PLAYER_LIST, playerList)

    const response = getPlayerSummary(socket)
    console.log('< join_game: ', response)
    callback(response)
  })

  socket.on(ACTION_NAMES.START_ROLE_SETUP, (_) => {
    if (!(invite_code in games)) {
        callback({ error: ERRORS.USER_IS_NOT_GAME_MASTER })
        return
      }

      const playerList = getPlayersOnGame(io.sockets, socket.game_id)

      if (playerList.length < MIN_NB_PLAYERS) {
        callback({ error: ERRORS.NOT_ENOUGH_PLAYERS })
        return
      }

      roles = AVAILABLE_ROLES_PER_NB_PLAYERS[playerList.length]
      playerList.forEach(player => {
          roles.sort(function() { return 0.5 - Math.random() })
          player.role = Role(roles.pop())
          const response = getPlayerSummary(player)
          console.log('< receive_role: ', response)
          player.emit(ACTION_NAMES.RECEIVE_ROLE, response)
      })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.user_id)
    if (socket.is_game_master) {
      // TODO: If the user is the master, kill the room
    }

    const playerList = getPlayersOnGame(io.sockets, socket.game_id)
    io.in(socket.game_id).emit(ACTION_NAMES.PLAYER_LIST, playerList)
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
