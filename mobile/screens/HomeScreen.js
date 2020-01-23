import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, View } from 'react-native'
// import RoomId from '../components/RoomId'
import { createGame } from '../socket'

const BUTTONS = [{ name: 'JOIN', path: '' }]

const createRoomButton = () => {
  const [clicked, setCliked] = useState(null)

  useEffect(() => {
    const joinRoom = async () => {
      const { game_id, user_id } = await createGame()
    }

    if (clicked) {
      joinRoom()
    }
  }, [clicked])

  return <Button title="Create" onPress={() => setCliked(true)} />
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <RoomId /> */}
      {BUTTONS.map(button => (
        <Button
          key={button.name}
          title={button.name}
          onPress={() => {
            alert('You tapped the button!')
          }}
        />
      ))}
      {createRoomButton()}
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
