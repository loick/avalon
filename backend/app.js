import uuid from 'uuid/v4'
import express from 'express'
import { ACTION_NAMES, ERRORS, PORT } from '../mobile/config'

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const games = {}

function generateInviteCode() {
    return Math.random().toString(36).substr(2).toUpperCase().substring(0, 4)
}

const getPlayerSummary = socket => ({
  user_id: socket.user_id,
  user_name: socket.user_name,
  game_id: socket.game_id,
  game_invite_code: socket.game_invite_code,
  is_game_master: socket.is_game_master,
})

io.on('connection', socket => {
  socket.user_id = uuid()
  socket.user_name = ''
  socket.game_id = null
  socket.game_invite_code = null
  socket.is_game_master = false
  console.log('User connected: ', socket.user_id)

  socket.on(ACTION_NAMES.PLAYER_NAME, ({ name }, callback) => {
    socket.user_name = name
    const response = getPlayerSummary(socket)
    console.log('< player_name: ', response)
    callback(response)
  })

  socket.on(ACTION_NAMES.NEW_GAME, (_) => {
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

    const response = getPlayerSummary(socket)
    console.log('< new_game: ', response)

    callback(response)
  })

  socket.on(ACTION_NAMES.JOIN_GAME, ({ invite_code }) => {
    if (!(invite_code in games)) {
      callback({ error: ERRORS.GAME_NOT_EXIST })
      return
    }

    const game_id = games[invite_code]
    socket.join(game_id)
    socket.game_id = game_id
    socket.game_invite_code = invite_code
    socket.is_game_master = false

    // TOOD: broadcast the player list. That way all new players would know all the players in the room.
    io.in(game_id).emit(ACTION_NAMES.NEW_PLAYER, socket.user_id)

    const response = getPlayerSummary(socket)
    console.log('< join_game: ', response)
    callback(response)
  })

  socket.on('disconnect', () => {
    if (socket.is_game_master) {
      // TODO: If the user is the master, kill the room
    }
    console.log('User disconnected: ', socket.user_id)
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
