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
  }

  setGameMaster(id) {
    this.game_master_id = id
  }

  setInviteCode(code) {
    this.invite_code = code
  }

  gameDetails(socketId) {
    return {
      id: this.id,
      invite_code: this.invite_code,
      is_game_master: this.game_master_id === socketId,
      roles: this.roles,
    }
  }
}

export default Game
