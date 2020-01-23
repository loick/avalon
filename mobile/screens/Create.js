import React, { Fragment, useState, useEffect } from 'react'
import { createGame } from '../socket'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default function CreateGame() {
  const [gameId, setGameId] = useState(null)

  useEffect(() => {
    const createGameFn = async () => {
      const { game_id } = await createGame()

      if (game_id) {
        setGameId(game_id)
      }
    }

    if (!gameId) {
      createGameFn()
    }
  }, [])

  return (
    <ScrollView style={styles.container}>
      {gameId ? (
        <Fragment>
          <Text>Game Created: {gameId}</Text>
          <Text>Waiting for users to join... (TODO, list of users)</Text>
        </Fragment>
      ) : (
        <Text>Creating the game room...</Text>
      )}
    </ScrollView>
  )
}

CreateGame.navigationOptions = {
  title: 'Create',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
