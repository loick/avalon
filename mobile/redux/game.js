import { combineReducers } from 'redux'
import { createStore } from 'redux'

//
// Initial State...
//

const initialState = {
  socketReady: false,
  gameId: null,
  userId: null,
}

// Action Names

const SOCKET_READY = 'SOCKET_READY'
const SOCKET_NOT_READY = 'SOCKET_NOT_READY'

//
// Reducer...
//

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_READY:
      return { ...state, socketReady: true }
    case SOCKET_NOT_READY:
      return { ...state, socketReady: false }
    default:
      return state
  }
}

//
// Store...
//

const rootReducer = combineReducers({ game: gameReducer })
const configureStore = () => createStore(rootReducer)

export { configureStore }

// Actions

const setSocketReady = () => ({ type: SOCKET_READY })
const setSocketNotReady = () => ({ type: SOCKET_NOT_READY })

export { setSocketReady, setSocketNotReady }
