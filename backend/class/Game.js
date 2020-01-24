import uuid from 'uuid/v4'

const generateInviteCode = () =>
  Math.random()
    .toString(36)
    .substr(2)
    .toUpperCase()
    .substring(0, 4)

class Game {
  constructor() {
    this.id = uuid()
    this.invite_code = generateInviteCode()
    this.game_master_id = null
    this.roles = []
    this.game_started = false
  }

  setGameMaster(id) {
    this.game_master_id = id
  }

  isGameMaster(id) {
    return this.game_master_id === id
  }

  setInviteCode(code) {
    this.invite_code = code
  }

  startGame() {
    this.game_started = true
  }

  toObject(socketId) {
    return {
      id: this.id,
      invite_code: this.invite_code,
      game_started: this.game_started,
      is_game_master: this.isGameMaster(socketId),
      roles: this.roles,
    }
  }
}

export default Game
