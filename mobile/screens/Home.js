import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import RoomId from '../components/RoomId'

const BUTTONS = ['CREATE', 'JOIN']

export default function Home() {
  return (
    <View style={styles.container}>
      <RoomId />
      {BUTTONS.map(button => (
        <Button key={button} title={button} />
      ))}
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
