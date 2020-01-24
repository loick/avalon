import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import TabBarIcon from '../components/TabBarIcon'
import Home from '../screens/Home'
import Rules from '../screens/Rules'
import Role from '../screens/Role'
import Recap from '../screens/Recap'
import Join from '../screens/Join'
import Create from '../screens/Create'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator({ Home, Create, Join }, config)

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

HomeStack.path = ''

const RulesStack = createStackNavigator({ Rules }, config)

RulesStack.navigationOptions = {
  tabBarLabel: 'Rules',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
}

RulesStack.path = ''

const roleProps = {
  role: 'Merlin',
  enemies: 'Trap, Elsa',
  allies: 'Loki, Antoine, Serge',
}
const RoleStack = createStackNavigator(
  { Role: () => <Role {...roleProps} /> },
  config,
)

RoleStack.navigationOptions = {
  tabBarLabel: 'Role',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
}

RoleStack.path = ''

const recapProps = {
  quests: [
    { id: 1, status: 1 },
    { id: 2, status: 0 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ],
  attempts: 2,
}
const RecapStack = createStackNavigator(
  { Recap: () => <Recap {...recapProps} /> },
  config,
)

RecapStack.navigationOptions = {
  tabBarLabel: 'recap',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
}

RecapStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  RulesStack,
  RoleStack,
  RecapStack,
})

tabNavigator.path = ''

export default tabNavigator
