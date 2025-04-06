import AccordionList from '@/components/AccordionList'
import { generalStyles } from '@/constants/Styles'
import React from 'react'
import { Text, View } from 'react-native'

const help = () => {
  return (
    <View style={generalStyles.container}>
      <AccordionList />
    </View>
  )
}

export default help
