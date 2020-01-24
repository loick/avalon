import io from 'socket.io-client'
import { API_URL, ACTION_NAMES } from './config'

const context = {
  user_id: null,
  game_invite_code: null,
}

const socket = io(API_URL)

const onJoiningGame = resolve => data => {
  context.game_invite_code = data.game_invite_code
  context.user_id = data.user_id

  // TODO: FAIL?

  resolve(data)
}
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time))

export const isConnected = () => {
  return new Promise(async (resolve, reject) => {
    while (!socket.connected) {
      await sleep(2000)
    }
    resolve(true)
  })
}

export const registerUsername = name => {
  return new Promise((resolve, reject) => {
    socket.emit(ACTION_NAMES.PLAYER_NAME, { ...context, name }, resolve)
  })
}

export const setGameReady = () => {
  return new Promise((resolve, reject) => {
    socket.emit(ACTION_NAMES.START_ROLE_SETUP, context, resolve)
  })
}

export const createGame = () => {
  return new Promise((resolve, reject) => {
    socket.emit(ACTION_NAMES.NEW_GAME, context, onJoiningGame(resolve))
  })
}

export const onPlayerAdded = cb => {
  socket.on(ACTION_NAMES.PLAYER_LIST, cb)
}

export const joinGame = id => {
  return new Promise((resolve, reject) => {
    socket.emit(
      ACTION_NAMES.JOIN_GAME,
      { ...context, invite_code: id },
      onJoiningGame(resolve),
    )
  })
}
