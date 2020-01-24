import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { connect } from 'react-redux'
import { setSocketReady } from '../redux/game'
import { isConnected } from '../socket'

const Connectivity = ({ dispatch, socketReady }) => {
  useEffect(() => {
    const prepareGameConnection = async () => {
      await isConnected()
      dispatch(setSocketReady())
    }

    if (!socketReady) {
      prepareGameConnection()
    }
  }, [socketReady])

  return (
    <Snackbar duration={10000} visible={!socketReady}>
      Waiting for server...
    </Snackbar>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
})

const mapStateToProps = state => {
  return {
    socketReady: state.game.socketReady,
  }
}

export default connect(mapStateToProps)(Connectivity)
