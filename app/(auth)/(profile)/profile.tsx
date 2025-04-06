import { useAuth } from '@/app/context/AuthContext'
import React from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'

const profile = () => {

  const {logout} = useAuth()

  return (
    <View>
      <Text>profile</Text>
      <TouchableOpacity onPress = {() => {logout()}}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default profile
