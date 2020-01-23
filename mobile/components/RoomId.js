import React, { useState, useEffect } from 'react'
import { joinGame } from '../socket'
import { View, Text } from 'react-native'

const RoomId = () => {
  const [gameId, setGameId] = useState(null)

  useEffect(() => {
    const joinRoom = async () => {
      const { game_id } = await joinGame('roomId')
      setGameId(game_id)
    }
    joinRoom()
  }, [])

  return (
    <View>
      {!gameId && <Text>Loading...</Text>}
      {gameId && <Text>{gameId}</Text>}
    </View>
  )
}

export default RoomId
