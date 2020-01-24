import React, { Fragment, useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Title, TextInput } from 'react-native-paper'
import { registerUsername } from '../socket'

export default function Home({ navigation: { navigate } }) {
  const [username, setUsername] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const setUsername = async () => {
      await registerUsername(username)
    }

    if (formSubmitted) {
      setUsername()
    }
  }, [formSubmitted])

  // TODO get it from redux
  // const areButtonsDisabled = !gameReady || !formSubmitted
  const areButtonsDisabled = !formSubmitted

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Avalon</Title>
      {!formSubmitted ? (
        <Fragment>
          <TextInput
            style={styles.input}
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
          <Button
            style={styles.joinButton}
            mode="outlined"
            onPress={() => setFormSubmitted(true)}
          >
            Validate
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <Button
            style={styles.joinButton}
            mode="outlined"
            disabled={areButtonsDisabled}
            onPress={() => navigate('Join')}
          >
            Join
          </Button>
          <Button
            style={styles.joinButton}
            mode="outlined"
            disabled={areButtonsDisabled}
            onPress={() => navigate('Create')}
          >
            Create
          </Button>
        </Fragment>
      )}
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
  input: {
    width: 200,
    marginBottom: 18,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})
