import React, { useState, useEffect } from 'react'
import { createGame, onPlayerAdded } from '../socket'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { List, Title, ActivityIndicator } from 'react-native-paper'

export default function CreateGame() {
  const [gameId, setGameId] = useState(null)
  const [players, updatePlayerList] = useState([])

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
    onPlayerAdded(p => {
      console.log('received', p)
      updatePlayerList(p)
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      {gameId ? (
        <View>
          <Title>Game Created: {gameId}</Title>
          {players.length === 0 && <Text>Waiting for users to join...</Text>}
          <List.Section>
            {players.map(player => (
              <List.Item
                key={player.user_id}
                title={player.user_name}
                description={player.is_game_master && 'GAME MASTER'}
                left={props => <List.Icon {...props} icon="folder" />}
              />
            ))}
          </List.Section>
        </View>
      ) : (
        <View style={styles.containerCreating}>
          <Text style={styles.loadingLabel}>Creating the game room...</Text>
          <ActivityIndicator activity={!gameId} />
        </View>
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
