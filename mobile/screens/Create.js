import React, { Fragment, useState, useEffect } from 'react'
import { createGame, onPlayerAdded } from '../socket'
import { ScrollView, StyleSheet, Title, Text } from 'react-native'
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
          <Title>Game Created: {gameId}</Title>
          <Text>Waiting for users to join... (TODO, list of users)</Text>
          <List.Section>
            {players.map(player => (
              <List.Item
                title={player}
                left={props => <List.Icon {...props} icon="folder" />}
              />
            ))}
          </List.Section>
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
