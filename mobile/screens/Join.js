import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { joinGame } from '../socket'

export default function Join({ navigation: { navigate } }) {
  const [valid, onValid] = useState(false)
  const [value, onChangeText] = useState('')

  useEffect(() => {
    const joinRoom = async () => {
      const { game_invite_code, error } = await joinGame(value)
      if (error) {
        onValid(false)
        console.log(error)
      }

      if (game_invite_code) {
        console.log('ready, go to loading screen')
      }
    }
    if (value && !valid) {
      joinRoom()
    } else {
      onValid(false)
    }
  }, [valid])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Room id"
        value={value}
        maxLength={4}
        onChangeText={onChangeText}
      />
      <Button mode="outlined" onPress={() => onValid(true)}>
        Join
      </Button>
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
    width: 200,
    marginBottom: 18,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})
