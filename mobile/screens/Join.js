import React, { useState } from 'react'
import { Button, View, TextInput } from 'react-native'

export default function Join({ navigation: { navigate } }) {
  const [value, onChangeText] = useState('Useless Placeholder')

  return (
    <View>
      <TextInput value={value} onChangeText={text => onChangeText(text)} />
      <Button title="Join" />
    </View>
  )
}
