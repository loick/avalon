import { SOCKET_URL, ACTION_NAMES } from './config'

class Room {
  connected = false

  constructor(roomNumber) {
    this.ws = new WebSocket(`${SOCKET_URL}/${roomNumber}/0`)
    this.ws.onopen = () => {
      this.connected = true
    }
    this.ws.onerror = e => {
      console.error(e.message)
    }
  }

  newRoom() {
    this.ws.send(JSON.stringify({ action: ACTION_NAMES.NEW_ROOM }))
  }

  sendAction() {
    this.ws.send(JSON.stringify({ action: ACTION_NAMES.JOIN_ROOM }))
  }
}

export default Room
