import React, { useState, useEffect } from 'react'
import Socket from '../socket'
import { Text } from 'react-native'

const RoomId = () => {
  const [gameId, setGameId] = useState(null)

  useEffect(() => {
    const joinRoom = async () => {
      const socket = new Socket()
      const { game_id } = await socket.joinRoom('roomId')
      setGameId(game_id)
    }
    joinRoom()
  }, [])

  return <Text>{gameId || 'no game id fetched'}</Text>
}

export default RoomId
