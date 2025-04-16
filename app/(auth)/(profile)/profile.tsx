import { useAuth } from '@/app/context/AuthContext'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import React from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'

const profile = () => {

  const {logout} = useAuth()

  return (
    <View>
      <Text>profile</Text>
        <TouchableOpacity style={[generalStyles.pillButton, { backgroundColor: Colors.royalBlue, marginBottom: 10 }]} onPress={() => {
                logout()
              }} >
            <Text style={generalStyles.textButton}>Iniciar sesión</Text>
        </TouchableOpacity>
    </View>
  )
}

export default profile
