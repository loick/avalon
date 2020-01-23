import React, { useState } from 'react'
import { Button, View, TextInput, StyleSheet } from 'react-native'

export default function Join({ navigation: { navigate } }) {
  const [value, onChangeText] = useState('Useless Placeholder')

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => onChangeText(text)}
      />
      <Button title="Join" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
})
