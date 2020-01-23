import React, { Fragment, useState, useEffect } from 'react'
import { createGame, onPlayerAdded } from '../socket'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { List } from 'react-native-paper'

export default function CreateGame() {
  const [gameId, setGameId] = useState(null)
  const [players, addNewPlayer] = useState([])

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

  useEffect(() => {
    onPlayerAdded(addNewPlayer)
  }, [])

  return (
    <ScrollView style={styles.container}>
      {gameId ? (
        <Fragment>
          <Text>Game Created: {gameId}</Text>
          <Text>Waiting for users to join...</Text>
          {players.map(player => (
            <List.Item
              title={player}
              left={props => <List.Icon {...props} icon="folder" />}
            />
          ))}
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
