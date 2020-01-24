import uuid from 'uuid/v4'
import express from 'express'
import { ACTION_NAMES, ERRORS, PORT } from '../mobile/config'

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const getPlayerSummary = socket => ({
  user_id: socket.user_id,
  user_name: socket.user_name,
  game_id: socket.game_id,
  is_game_master: socket.is_game_master,
})

const getPlayersOnGame = game_id => {
  if (io.sockets.adapter.rooms[game_id]) {
    const clients = io.sockets.adapter.rooms[game_id].sockets

    return Object.entries(clients)
      .filter(([client, connected]) => connected)
      .map(([client]) => {
        return getPlayerSummary(io.sockets.connected[client])
      })
  }

  return []
}

io.on('connection', socket => {
  socket.user_id = uuid()
  socket.user_name = ''
  socket.game_id = null
  socket.is_game_master = false
  console.log('User connected: ', socket.user_id)

  socket.on(ACTION_NAMES.PLAYER_NAME, ({ name }, callback) => {
    socket.user_name = name
    const response = getPlayerSummary(socket)
    console.log('< player_name: ', response)
    callback(response)
  })

  socket.on(ACTION_NAMES.NEW_GAME, (_, callback) => {
    const new_game_id = uuid()
    socket.join(new_game_id)
    socket.game_id = new_game_id
    socket.is_game_master = true

    const response = getPlayerSummary(socket)
    console.log('< new_game: ', response)

    callback(response)
  })

  socket.on(ACTION_NAMES.JOIN_GAME, ({ game_id }, callback) => {
    // Checks if room exists
    if (!io.sockets.adapter.rooms[game_id]) {
      callback({ error: ERRORS.GAME_NOT_EXIST })
      return
    }

    socket.join(game_id)
    socket.game_id = game_id
    socket.is_game_master = false

    console.log(getPlayersOnGame(socket.game_id))
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
