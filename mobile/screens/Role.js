import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Title, Text } from 'react-native-paper'

export default function Setup({ role, enemies, allies, rule }) {
  return (
    <View style={styles.container}>
      <Title>You are: {role}</Title>
      <Text> You fight: {enemies} </Text>
      <Text>You can trust {allies}</Text>
      <Text>{rule}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
