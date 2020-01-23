import io from 'socket.io-client'
import { API_URL, ACTION_NAMES } from './config'

const context = {
  user_id: null,
  game_id: null,
}

console.log('socket init', io)

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log(socket.id) // 'G5p5...'
})

const onJoiningGame = resolve => data => {
  context.game_id = data.game_id
  context.user_id = data.user_id

  // TODO: FAIL?

  resolve(data)
}

export const createGame = () => {
  return new Promise((resolve, reject) => {
    socket.emit(ACTION_NAMES.NEW_GAME, context, onJoiningGame(resolve))
  })
}

export const joinGame = id => {
  return new Promise((resolve, reject) => {
    socket.emit(
      ACTION_NAMES.JOIN_GAME,
      { ...context, game_id: id },
      onJoiningGame(resolve),
    )
  })
}
