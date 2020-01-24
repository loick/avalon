import React, { Fragment } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import {
  Title,
  Text,
  Badge,
  Divider,
  Colors,
  ActivityIndicator,
} from 'react-native-paper'

export default function Setup({ quests, attempts, builder = 'toto' } = {}) {
  return (
    <View style={styles.holder}>
      <View style={styles.containerHorizontal}>
        <View style={styles.quests}>
          <Title>Quests:</Title>
          <View style={styles.questsList}>
            {quests.map(({ id, status }) => {
              if (status === 1) {
                return (
                  <Text key={id} style={[styles.badge, styles.success]}></Text>
                )
              }
              if (status === 0) {
                return (
                  <Text style={[styles.badge, styles.failure]} key={id}></Text>
                )
              }

              return <Text style={styles.badge} key={id}></Text>
            })}
          </View>
        </View>
        <View style={styles.attempts}>
          <Title>Attempts:</Title>
          <Badge size={50}>{attempts}/5</Badge>
        </View>
      </View>
      <View style={styles.building}>
        <Title style={styles.buildingLabel}>
          {builder} is building the Quest !
        </Title>
        <ActivityIndicator activity={true} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  containerHorizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  quests: {
    flex: 2,
  },
  questsList: {
    flex: 1,
    flexDirection: 'row',
  },
  attempts: {
    flex: 1,
  },
  building: {
    flex: 1,
  },
  buildingLabel: {
    marginBottom: 20,
    textAlign: 'center',
  },
  badge: {
    padding: 12,
    borderRadius: 360,
    backgroundColor: Colors.grey300,
    height: 40,
    width: 40,
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
