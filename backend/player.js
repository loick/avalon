export const MIN_NB_PLAYERS = 5

export const getPlayerSummary = socket => ({
  user_id: socket.user_id,
  user_name: socket.user_name,
  game_id: socket.game_id,
  game_invite_code: socket.game_invite_code,
  is_game_master: socket.is_game_master,
  role: socket.role.name,
})

export const getPlayersOnGame = (ioSockets, game_id) => {
  if (ioSockets.adapter.rooms[game_id]) {
    const clients = ioSockets.adapter.rooms[game_id].sockets

    return Object.entries(clients)
      .filter(([client, connected]) => connected)
      .map(([client]) => {
        return getPlayerSummary(ioSockets.connected[client])
      })
  }

  return []
}
