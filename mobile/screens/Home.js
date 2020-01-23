import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Title } from 'react-native-paper'

export default function Home({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Avalon</Title>
      <Button
        style={styles.joinButton}
        mode="outlined"
        onPress={() => navigate('Join')}
      >
        Join
      </Button>
      <Button
        style={styles.joinButton}
        mode="outlined"
        onPress={() => navigate('Create')}
      >
        Create
      </Button>
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
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  joinButton: {
    marginBottom: 20,
  },
})
