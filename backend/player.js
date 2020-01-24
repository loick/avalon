export const MIN_NB_PLAYERS = 5

export const getPlayersOnGame = (ioSockets, game_id) => {
  if (ioSockets.adapter.rooms[game_id]) {
    const clients = ioSockets.adapter.rooms[game_id].sockets

    return Object.entries(clients)
      .filter(([client, connected]) => connected)
      .map(([client]) => {
        return ioSockets.connected[client].user.toObject()
      })
  }

  return []
}
