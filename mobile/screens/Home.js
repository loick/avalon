import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import Rules from './Rules'

const BUTTONS = ['CREATE', 'JOIN']

export default function Home() {
  return (
    <View style={styles.container}>
      {BUTTONS.map(button => (
        <Button
          key={button}
          title={button}
          onPress={() => this.props.navigation.navigate(Rules)}
        />
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
