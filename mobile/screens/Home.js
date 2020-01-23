import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, View } from 'react-native'
// import RoomId from '../components/RoomId'
import { createGame } from '../socket'

const createRoomButton = navigate => {
  const [clicked, setCliked] = useState(null)

  useEffect(() => {
    const joinRoom = async () => {
      const { game_id } = await createGame()

      if (game_id) {
        navigate('Rules')
      }
    }

    if (clicked) {
      joinRoom()
    }
  }, [clicked])

  return <Button title="Create" onPress={() => setCliked(true)} />
}

export default function Home({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      {/* <RoomId /> */}
      <Button title="Join" onPress={() => navigate('Join')} />
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
})
