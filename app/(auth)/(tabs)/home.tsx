import { env } from '@/app/config/envConfig';
import AuthContext, { useAuth } from '@/app/context/AuthContext';
import transactions from '@/app/data/dummyData.js';
import { determineTransactionIcon, formatDate } from '@/app/utils/utils';
import RoundCornerBtn from '@/components/RoundCornerBtn';
import Colors from '@/constants/Colors';
import { generalStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const home = () => {


  const [balance, setBalance] = useState(1420)
  const  [account, setAccount] = useState('')
  const [loading, setLoading] = useState(true);
  const [dbTransactions, setDbTransactions] = useState([]);
  const [noTransactions, setNoTransactions] = useState(false);

  const { user,accountContext, setAccountData, reloadFlag } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        console.log('No user found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userRes = await axios.get(`${env.API_URL}/users/me/${user.email}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${user.token}` }
        });

        const accountRes = await axios.get(`${env.API_URL}/accounts/get/${user.id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${user.token}` }
        });

        const { account } = accountRes.data;

        if (account) {
          const { balance, account_number, status, _id: id } = account;
          setAccountData(accountRes.data);
          setBalance(balance);
          setAccount(account_number);
        } else {
          console.log('No account data found');
          setLoading(false);
          return;
        }


        const transactionsRes = await axios.get(`${env.API_URL}/transactions/account/${user.email}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if(transactionsRes.data.transactions.length === 0) {
          setNoTransactions(true)
        } else {
          setNoTransactions(false)
          setDbTransactions(transactionsRes.data.transactions);
        }

      } catch (error: any) {
        console.error('Error durante la carga de datos:', error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, reloadFlag]);

  return (
    <View style={[generalStyles.container, { paddingTop: 60 }]}>
      <View style={styles.section}>
        <Text style={styles.sectionText}>{balance}</Text>
        <Text style={styles.sectionTextSmall}>€</Text>
      </View>
      <View style={styles.actionsContainer}>
        <Link href='/(auth)/(profile)/add' asChild>
          <RoundCornerBtn text='Ingresar' icon='add' onPress={() => { }} />
        </Link>
        <Link href='/(auth)/(profile)/withdraw' asChild>
          <RoundCornerBtn text='Retirar' icon='remove' onPress={() => { }} />
        </Link>
        <Link href='/(auth)/(profile)/transactions' asChild>
          <RoundCornerBtn text='Movimientos' icon='currency-exchange' onPress={() => { }} />
        </Link>
        <Link href='/(auth)/(profile)/transfers' asChild>
          <RoundCornerBtn text='Transferencias' icon='swap-horiz' onPress={() => { }} />
        </Link>
      </View>

      <ScrollView style={{ backgroundColor: Colors.white, padding: 20, borderRadius: 10, marginBottom: 50 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 20 }}>Últimos movimientos</Text>
        {loading ? (
        <ActivityIndicator size="large" color={Colors.royalBlue} />
      ) : noTransactions ? (
        <Text>No tienes transacciones.</Text>
      ) : (
          dbTransactions.slice(-8).reverse().map((transaction: any, index: number) => (
            <View key={index}>
              <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                <Text style={{ fontSize: 14, color: Colors.gray, marginBottom: 5 }}>
                  {formatDate(transaction.createdAt)}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: Colors.lightGray, borderBottomWidth: 1, paddingVertical: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>
                    {transaction.type}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 5 }}>
                    {determineTransactionIcon(transaction.type)}
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>
                      {isNaN(Number(transaction.amount)) ? '0.00' : `${Math.abs(Number(transaction.amount)).toFixed(2)}`}
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      €
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
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
