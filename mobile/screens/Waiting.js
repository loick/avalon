import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

export default function Waiting() {
  return (
    <View>
      <Text style={styles.text}>Waiting for game master ...</Text>
      <ActivityIndicator />
    </View>
  )
}

const styles = StyleSheet.create({
  text: { marginBottom: 20 },
})
