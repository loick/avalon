import io from 'socket.io-client'
import { API_URL, ACTION_NAMES } from './config'

const context = {
  user_id: null,
  game_id: null,
}

const socket = io(API_URL)

export const newGame = () => {
  return new Promise((resolve, reject) => {
    socket.emit(ACTION_NAMES.NEW_GAME, context, data => {
      context.game_id = data.game_id
      resolve(data)

      // TODO: FAIL?
    })
  })
}

export const joinGame = id => {
  return new Promise((resolve, reject) => {
    socket.emit(ACTION_NAMES.JOIN_GAME, { ...context, game_id: id }, data => {
      context.game_id = data.game_id
      resolve(data)

      // TODO: FAIL?
    })
  })
}
