import io from 'socket.io-client'
import { API_URL, ACTION_NAMES } from './config'

class Socket {
  context = {
    user_id: null,
    game_id: null,
  }

  constructor() {
    this.socket = io(API_URL)

    this.socket.on('connect', () => {
      console.log(this.socket.connected) // true
    })
  }

  async newRoom() {
    return new Promise((resolve, reject) => {
      this.socket.emit(ACTION_NAMES.NEW_GAME, this.context, data => {
        resolve(data)
      })
    })
  }

  async joinRoom(id) {
    return new Promise((resolve, reject) => {
      if (this.context.game_id) {
        resolve({ game_id: this.context.game_id })
      }

      this.socket.emit(
        ACTION_NAMES.JOIN_GAME,
        { ...this.context, game_id: id },
        data => {
          console.log('data', data)
          this.context.game_id = data.game_id
          resolve(data)
        },
      )
    })
  }
}

export default Socket
