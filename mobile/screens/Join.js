import React, { useState, useEffect } from 'react'
import { Button, View, TextInput } from 'react-native'
import { joinGame } from '../socket'

export default function Join({ navigation: { navigate } }) {
  const [gameId, setGameId] = useState(null)
  const [valid, onValid] = useState(false)
  const [value, onChangeText] = useState('')

  useEffect(() => {
    const joinRoom = async () => {
      const { game_id } = await joinGame('roomId')
      setGameId(game_id)
    }
    joinRoom()
  }, [valid])

  return (
    <View>
      <TextInput
        value={value}
        maxLength={4}
        onChangeText={text => onChangeText(text)}
      />
      <Button title="Join" onPress={() => onValid(true)} />
    </View>
  )
}
