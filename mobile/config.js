export const PORT = 3000
export const API_URL = `http://localhost:${PORT}`

export const NB_MIN_PLAYERS = 5
export const NB_MAX_PLAYERS = 10

export const ACTION_NAMES = {
  NEW_GAME: 'new_game',
  JOIN_GAME: 'join_game',
  PLAYER_LIST: 'player_list',
  PLAYER_NAME: 'player_name',
  REMOVE_PLAYER: 'remove_player',
  START_ROLE_SETUP: 'start_role_setup',
  RECEIVE_ROLE: 'receive_role',
}

export const ERRORS = {
  GAME_NOT_EXIST: 'GAME_NOT_EXIST',
  USER_IS_NOT_GAME_MASTER: 'USER_IS_NOT_GAME_MASTER',
  NOT_ENOUGH_PLAYERS: 'NOT_ENOUGH_PLAYERS',
}
