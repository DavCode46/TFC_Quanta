import { env } from '@/app/config/envConfig';
import AuthContext, { useAuth } from '@/app/context/AuthContext';
import transactions from '@/app/data/dummyData.js';
import RoundCornerBtn from '@/components/RoundCornerBtn';
import Colors from '@/constants/Colors';
import { generalStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const home = () => {


  const [balance, setBalance] = useState(1420)
  const  [account, setAccount] = useState('')
  const [dbtransactions, setDbTransactions] = useState(transactions)
  const { user } = useAuth()


  useEffect(() => {



    if (!user || !user.id) {
      console.log('No user found');
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.104:3000/api/users/me/${user.email}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${user.token}` }
          }
        )
        const { username, email, phone, id} = res.data;
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    }

    const fetchAccount = async () => {
      try {

        const res = await axios.get(
          `http://192.168.1.104:3000/api/accounts/get/${user.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${user.token}` }
          }
        )
        const { account } = res.data;

        if (account) {
          const { balance, account_number, status, _id: id } = account;

          setBalance(balance);
          setAccount(account_number);
        } else {
          console.log('No account data found');
        }


      } catch (error) {
        console.log('Error fetching account:', error);
      }
    }

    fetchUser();
    fetchAccount();
  }, [user]);



  return (
    <View style={[generalStyles.container, { paddingTop: 60 }]}>
      <View style={styles.section}>
        <Text style={styles.sectionText}>{balance}</Text>
        <Text style={styles.sectionTextSmall}>€</Text>
      </View>
      <View style={styles.actionsContainer}>
        <Link href='/(auth)/(profile)/add' asChild>
          <RoundCornerBtn text='Ingresar' icon='add-outline' onPress={() => { }} />
        </Link>
        <Link href='/(auth)/(profile)/withdraw' asChild>
          <RoundCornerBtn text='Retirar' icon='remove-outline' onPress={() => { }} />
        </Link>
        <Link href='/(auth)/(profile)/transactions' asChild>
          <RoundCornerBtn text='Movimientos' icon='cash-outline' onPress={() => { }} />
        </Link>
        <Link href='/(auth)/(profile)/cards' asChild>
          <RoundCornerBtn text='Tarjetas' icon='card-outline' onPress={() => { }} />
        </Link>
      </View>

      <ScrollView style={{ backgroundColor: Colors.white, padding: 20, borderRadius: 10, marginBottom: 50 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 20 }}>Últimos movimientos</Text>
        {dbtransactions.slice(-8).reverse().map((transaction: any, index: number) => (
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
    </View>
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
    marginVertical: 20,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
  },
  roundBtnSize: {
    width: 50,
    height: 50,
  }
})

export default home
