import { generalStyles } from '@/constants/Styles'
import React from 'react'
import { Text, View } from 'react-native'

const home = () => {
  return (
    <View style={generalStyles.container}>
      <Text style={generalStyles.header}>home</Text>
    </View>
  )
}

export default home
