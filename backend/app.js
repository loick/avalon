import uuid from 'uuid/v4'
import express from 'express'
import { ACTION_NAMES, PORT } from '../mobile/config'
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  socket.user_id = uuid()
  console.log('User connected: ', socket.user_id)

  socket.on(ACTION_NAMES.NEW_GAME, (msg, callback) => {
    console.log('> new_game: ', msg)
    const new_game_id = uuid()
    socket.join(new_game_id)

    const response = { user_id: socket.user_id, game_id: new_game_id }
    console.log('< new_game: ', response)
    callback(response)
  })

  socket.on(ACTION_NAMES.JOIN_GAME, (msg, callback) => {
    console.log('> join_game: ', msg)
    const game_id = msg.game_id
    socket.join(game_id)

    io.to(game_id).emit('new_player', socket.user_id)

    const response = { user_id: socket.user_id, game_id: game_id }
    console.log('< join_game: ', response)
    callback(response)
  })

  socket.on('disconnect', function() {
    console.log('User disconnected: ', socket.user_id)
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
