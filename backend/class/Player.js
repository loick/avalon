import uuid from 'uuid/v4'

class Player {
  constructor() {
    this.id = uuid()
    this.user_name = ''
    this.role = null
  }

  setUsername(name) {
    this.user_name = name
  }

  setRole(role) {
    this.role = role
  }

  toObject() {
    return {
      user_id: this.id,
      user_name: this.user_name,
      role: this.role,
    }
  }
}

export default Player
