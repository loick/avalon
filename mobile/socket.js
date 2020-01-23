import io from 'socket.io-client'
import { SOCKET_URL, ACTION_NAMES } from './config'

class Socket {
  context = {
    user_id: null,
    room_id: null,
  }

  constructor() {
    this.socket = io(`${SOCKET_URL}/`)
  }

  async newRoom() {
    return new Promise((resolve, reject) => {
      this.socket.emit(ACTION_NAMES.NEW_ROOM, this.context, data => {
        resolve(data)
      })
    })
  }

  async joinRoom(id) {
    return new Promise((resolve, reject) => {
      if (this.context.room_id) {
        resolve({ room_id: this.context.room_id })
      }

      this.socket.emit(
        ACTION_NAMES.JOIN_ROOM,
        { ...this.context, room_id: id },
        data => {
          this.context.room_id = data.room_id
          resolve(data)
        },
      )
    })
  }
}

export default Socket
