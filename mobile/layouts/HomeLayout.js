import React from 'react'
import { View, StyleSheet } from 'react-native'
import Home from '../screens/Home'

export default function HomeLayout(props) {
  return (
    <View style={styles.container}>
      <Home {...props}></Home>
    </View>
  )
}

HomeLayout.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
