import React, { useState, useEffect } from 'react'
import { Button, View, TextInput } from 'react-native'
import { joinGame } from '../socket'

export default function Join({ navigation: { navigate } }) {
  const [valid, onValid] = useState(false)
  const [value, onChangeText] = useState('')

  useEffect(() => {
    const joinRoom = async () => {
      const { game_id, error } = await joinGame(value)
      if (error) {
        onValid(false)
        console.log(error)
      }

      if (game_id) {
        console.log('ready, go to loading screen')
      }
    }
    if (value && valid) {
      joinRoom()
    }
  }, [valid])

  return (
    <View>
      <TextInput value={value} maxLength={4} onChangeText={onChangeText} />
      <Button title="Join" onPress={() => onValid(true)} />
    </View>
  )
}
