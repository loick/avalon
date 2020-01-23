import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

const BUTTONS = ['CREATE', 'JOIN']

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {BUTTONS.map(button => (
        <Button title={button} />
      ))}
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null,
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/',
  )
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes',
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
