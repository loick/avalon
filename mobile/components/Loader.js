import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

export default function Loader({ isLoading }) {
  return <ActivityIndicator activity={isLoading} />
}
