import React, { useState, useEffect } from 'react'
import { Button, View, TextInput, StyleSheet } from 'react-native'
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        maxLength={4}
        onChangeText={onChangeText}
      />
      <Button title="Join" onPress={() => onValid(true)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
})
