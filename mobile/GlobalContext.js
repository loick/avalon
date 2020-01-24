import React from 'react'

const context = {
  user: {
    isMaster: false,
    id: 0,
    isLogged: false,
    isPlaying: false,
  },
}

export default function GlobalContext() {
  return React.createContext(context)
}

// export default function GlobalProvider() {
//   return createContext(context)
// }
