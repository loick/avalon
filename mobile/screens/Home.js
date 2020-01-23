import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Title } from 'react-native-paper'
import { createGame } from '../socket'

const createRoomButton = navigate => {
  const [clicked, setCliked] = useState(null)

  useEffect(() => {
    const createGameFn = async () => {
      const { game_id } = await createGame()

      if (game_id) {
        navigate('Create')
      }
    }

    if (clicked) {
      createGameFn()
    }
  }, [clicked])

  return (
    <Button mode="outlined" onPress={() => setCliked(true)}>
      Create
    </Button>
  )
}

export default function Home({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Avalon</Title>
      <Button
        style={styles.joinButton}
        mode="outlined"
        onPress={() => navigate('Join')}
      >
        Join
      </Button>
      {createRoomButton(navigate)}
    </View>
  )
}

Home.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  joinButton: {
    marginBottom: 20,
  },
})
