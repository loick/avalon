import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default function Rules() {
  return (
    <ScrollView style={styles.container}>
      <Text>List of the rules</Text>
      <Text>List of the available characters</Text>
    </ScrollView>
  )
}

Rules.navigationOptions = {
  title: 'Rules of the game',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
