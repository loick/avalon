import io from 'socket.io-client'
import { API_URL, ACTION_NAMES } from './config'

const context = {
  user_id: null,
  game_id: null,
}

const socket = io(API_URL)

socket.on('connect', () => {
  console.log(socket.id) // 'G5p5...'
})

const onJoiningGame = resolve => data => {
  context.game_id = data.game_id
  context.user_id = data.user_id

  // TODO: FAIL?

  resolve(data)
}
export const sleep = time =>
  new Promise(resolve => setTimeout(() => resolve(), time))

export const isConnected = () => {
  return new Promise(async (resolve, reject) => {
    while (!socket.connected) {
      await sleep(2000)
    }
    resolve(true)
  })
}

export const createGame = () => {
  return new Promise((resolve, reject) => {
    socket.emit(ACTION_NAMES.NEW_GAME, context, onJoiningGame(resolve))
  })
}

export const onPlayerAdded = cb => {
  socket.on(ACTION_NAMES.NEW_PLAYER, cb)
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
