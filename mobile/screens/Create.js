import React, { useState, useEffect } from 'react'
import { createGame, onPlayerAdded, setGameReady } from '../socket'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { List, Title, ActivityIndicator, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import { setGameId } from '../redux/game'
// import { NB_MIN_PLAYERS, NB_MAX_PLAYERS } from '../config'

const CreateGame = ({ dispatch, gameId }) => {
  const [players, updatePlayerList] = useState([])
  const [isGameReady, setReadyToStart] = useState(false)

  useEffect(() => {
    const createGameFn = async () => {
      const { game } = await createGame()

      if (game.invite_code) {
        dispatch(setGameId(game.invite_code))
      }
    }

    if (!gameId) {
      createGameFn()
    }
  }, [])

  useEffect(() => {
    onPlayerAdded(updatePlayerList)
  }, [])

  useEffect(() => {
    const validateGameSettings = async () => {
      await setGameReady()

      // if (game.invite_code) {
      //   dispatch(setGameId(game.invite_code))
      // }
    }

    if (!isGameReady) {
      validateGameSettings()
    }
  }, [isGameReady])

  const isTeamValid = true
  // players.length >= NB_MIN_PLAYERS && players.length <= NB_MAX_PLAYERS

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
                left={props => (
                  <List.Icon
                    {...props}
                    icon={
                      player.is_game_master
                        ? 'account-check'
                        : 'account-check-outline'
                    }
                  />
                )}
              />
            ))}
          </List.Section>
          <Button
            disabled={!isTeamValid}
            mode="outlined"
            onPress={() => setReadyToStart(true)}
          >
            Go with this team
          </Button>
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

const mapStateToProps = state => {
  return {
    gameId: state.game.gameId,
  }
}

export default connect(mapStateToProps)(CreateGame)
