import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, TextInput, ActivityIndicator } from 'react-native-paper'
import { joinGame } from '../socket'

const JOINING_STATE = {
  INIT: '',
  INPUT: 'JOINING_STATE_INPUT',
  WAITING_GAME: 'JOINING_WAITING_GAME',
  ERROR: 'JOINING_ERROR',
}

export default function Join({ navigation: { navigate } }) {
  const [pageState, onPageStateChange] = useState(JOINING_STATE.INIT)
  const [value, onChangeText] = useState('')

  useEffect(() => {
    let joining = false
    const joinRoom = async () => {
      const { game, error } = await joinGame(value)
      if (error) {
        joining = false
        onPageStateChange(JOINING_STATE.ERROR)
      }

      if (game.invite_code) {
        onPageStateChange(JOINING_STATE.WAITING_GAME)
      }
    }

    if (!joining && pageState === JOINING_STATE.INPUT) {
      joining = true
      joinRoom()
    }
  }, [pageState])

  const onInputChange = value => {
    onPageStateChange(JOINING_STATE.INIT)
    onChangeText(value.toUpperCase())
  }

  const isJoiningTheRoom = pageState === JOINING_STATE.INPUT
  const isError = pageState === JOINING_STATE.ERROR
  const isJoiningWaitingForGameToSTart =
    pageState === JOINING_STATE.WAITING_GAME

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Room id"
        value={value}
        maxLength={4}
        onChangeText={onInputChange}
      />
      <Button
        mode="outlined"
        onPress={() => onPageStateChange(JOINING_STATE.INPUT)}
      >
        Join
      </Button>
      {isJoiningTheRoom && (
        <View>
          <Text>Joining the room...</Text>
          <ActivityIndicator activity />
        </View>
      )}
      {isJoiningWaitingForGameToSTart && (
        <View>
          <Text>Waiting for the creator to start the game...</Text>
          <ActivityIndicator activity />
        </View>
      )}
      {isError && (
        <View>
          <Text>This room does not exist</Text>
        </View>
      )}
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
