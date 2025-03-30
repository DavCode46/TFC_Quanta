import { generalStyles } from '@/constants/Styles'
import React from 'react'
import { Text, View } from 'react-native'

const home = () => {
  const user = 'user'

  return (
    <View style={generalStyles.container}>
      <Text style={generalStyles.header}>{`Bienvenido ${user}`}</Text>

    </View>
  )
}

export default home
