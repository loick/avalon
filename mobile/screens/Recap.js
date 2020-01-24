import React, { Fragment } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Title, Text, Badge, Divider, Colors } from 'react-native-paper'

export default function Setup({ quests, attempts, builder }) {
  return (
    <View style={styles.container}>
      <Title>Quests:</Title>
      <FlatList
        horizontal
        data={quests}
        renderItem={({ item }) => {
          if (item.status === 1) {
            return (
              <Text key={item.id} style={[styles.badge, styles.success]}></Text>
            )
          }
          if (item.status === 0) {
            return (
              <Text style={[styles.badge, styles.failure]} key={item.id}></Text>
            )
          }

          return <Text style={styles.badge} key={item.id}></Text>
        }}
      />
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
  badge: {
    padding: 12,
    borderRadius: 360,
    backgroundColor: Colors.grey300,
    height: 50,
    width: 50,
    margin: 1,
    borderWidth: 10,
    borderColor: Colors.grey900,
  },
  success: {
    backgroundColor: Colors.green300,
  },
  failure: {
    backgroundColor: Colors.red300,
  },
})
