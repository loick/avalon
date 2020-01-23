import uuid from 'uuid/v4'
import express from 'express'
import { ACTION_NAMES, ERRORS, PORT } from '../mobile/config'

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const games = []

io.on('connection', socket => {
  socket.user_id = uuid()
  console.log('User connected: ', socket.user_id)

  socket.on(ACTION_NAMES.NEW_GAME, (msg, callback) => {
    console.log('> new_game: ', msg)
    const new_game_id = uuid()
    games.push(new_game_id)
    socket.join(new_game_id)

    const response = { user_id: socket.user_id, game_id: new_game_id }
    console.log('< new_game: ', response)
    callback(response)
  })

  socket.on(ACTION_NAMES.JOIN_GAME, ({ game_id }, callback) => {
    if (!games.includes(game_id)) {
      callback({ error: ERRORS.GAME_NOT_EXIST })
      return
    }

    console.log('> join_game: ', game_id)
    socket.join(game_id)

    io.in(game_id).emit(ACTION_NAMES.NEW_PLAYER, socket.user_id)

    const response = { user_id: socket.user_id, game_id: game_id }
    console.log('< join_game: ', response)
    callback(response)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.user_id)
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
