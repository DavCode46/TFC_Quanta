import AccordionList from '@/components/AccordionList'
import { generalStyles } from '@/constants/Styles'
import React from 'react'
import { ScrollView } from 'react-native'


const help = () => {
  return (
    <ScrollView style={generalStyles.container}>
      <AccordionList />
    </ScrollView>
  )
}

export default help
