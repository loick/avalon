import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Title } from 'react-native-paper'
import { isConnected } from '../socket'

export default function Home({ navigation: { navigate } }) {
  const [gameReady, setGameReady] = useState(false)

  useEffect(() => {
    const prepareGameConnection = async () => {
      const gameStatus = await isConnected()
      setGameReady(gameStatus)
    }

    if (!gameReady) {
      prepareGameConnection()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        Avalon ({gameReady ? 'Ready' : 'Not ready...'})
      </Title>
      <Button
        style={styles.joinButton}
        mode="outlined"
        onPress={() => navigate('Join')}
      >
        Join
      </Button>
      <Button
        style={styles.joinButton}
        mode="outlined"
        onPress={() => navigate('Create')}
      >
        Create
      </Button>
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
