import CircleBtn from '@/components/CircleBtn';
import Colors from '@/constants/Colors';
import { generalStyles } from '@/constants/Styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const home = () => {
  const balance = '1420'

  const transactions = [
  ]

  return (
    <ScrollView style={[generalStyles.container, { paddingTop: 60 }]}>
      <View style={styles.section}>
        <Text style={styles.sectionText}>{balance}</Text>
        <Text style={styles.sectionTextSmall}>€</Text>
      </View>
      <View style={styles.actionsContainer}>
        <Link href='/(auth)/(profile)/add' asChild>
          <CircleBtn text='Ingresar' icon='add-outline' onPress={() => { }} />
        </Link>
        <Link href='/(auth)/(profile)/withdraw' asChild>
          <CircleBtn text='Retirar' icon='remove-outline' onPress={() => { }} />
        </Link>
        <Link href='/(auth)/(profile)/movements' asChild>
          <CircleBtn text='Movimientos' icon='cash-outline' onPress={() => { }} />
        </Link>
        <Link href='/(auth)/(profile)/cards' asChild>
          <CircleBtn text='Tarjetas' icon='card-outline' onPress={() => { }} />
        </Link>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 5
  },
  sectionText: {
    fontSize: 50,
    fontWeight: '700',
  },
  sectionTextSmall: {
    fontSize: 20,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  roundBtnSize: {
    width: 50,
    height: 50,
  }
})

export default home
