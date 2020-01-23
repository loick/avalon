import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default function CreateGame() {
  return (
    <ScrollView style={styles.container}>
      <Text>Create</Text>
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
