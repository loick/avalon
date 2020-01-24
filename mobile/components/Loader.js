import { React } from 'react'
import { ActivityIndicator, Colors } from 'react-native-paper'

export default function Loader({ isLoading }) {
  return <ActivityIndicator activity={isLoading} />
}
