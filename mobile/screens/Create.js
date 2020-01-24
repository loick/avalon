import React, { useState, useEffect } from 'react'
import { createGame, onPlayerAdded } from '../socket'
import { ScrollView, View, StyleSheet, Title, Text } from 'react-native'
import { List, ActivityIndicator } from 'react-native-paper'

export default function CreateGame() {
  const [gameId, setGameId] = useState(null)
  const [players, addNewPlayer] = useState([])

  useEffect(() => {
    const createGameFn = async () => {
      const { game_invite_code } = await createGame()

      if (game_invite_code) {
        setGameId(game_invite_code)
      }
    }

    if (!gameId) {
      createGameFn()
    }
  }, [])

  useEffect(() => {
    onPlayerAdded(addNewPlayer)
  }, [])

  return gameId ? (
    <ScrollView style={styles.container}>
      <View>
        <Title>Game Created: {gameId}</Title>
        <Text>Waiting for users to join...</Text>
        <List.Section>
          {players.map(player => (
            <List.Item
              title={player}
              left={props => <List.Icon {...props} icon="folder" />}
            />
          ))}
        </List.Section>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.containerCreating}>
      <Text style={styles.loadingLabel}>Creating the game room...</Text>
      <ActivityIndicator activity={!gameId} />
    </View>
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
    justifyContent: 'center',
  },
  containerCreating: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLabel: {
    marginBottom: 16,
  },
})
