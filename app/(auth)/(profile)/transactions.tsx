import transactions from '@/app/data/dummyData'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const Transactions = () => {
  return (
    <ScrollView style={{ backgroundColor: Colors.white, padding: 20, borderRadius: 10, marginBottom: 50 }}>
      <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 20 }}>Movimientos</Text>
      {transactions.reverse().map((transaction: any, index: number) => (
        <View key={index} >
          <View style={{ flexDirection: 'column', marginBottom: 20 }}>
            <Text style={{ fontSize: 14, color: Colors.gray, marginBottom: 5 }}>
              {transaction.fecha}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: Colors.lightGray, borderBottomWidth: 1, paddingVertical: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                {transaction.descripcion}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 5 }}>
                {transaction.monto > 0 ? <Ionicons name='add' size={20} color='black' /> : <Ionicons name='remove' size={20} color='black' />}
                <Text style={{ fontSize: 16, fontWeight: '500' }}>
                  {`${Math.abs(transaction.monto.toFixed(2))}`}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  €
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

export default Transactions
