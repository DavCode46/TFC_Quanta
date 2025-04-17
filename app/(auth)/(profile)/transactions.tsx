import { env } from '@/app/config/envConfig'
import { useAuth } from '@/app/context/AuthContext'
import transactions from '@/app/data/dummyData'
import { determineTransactionIcon, formatDate } from '@/app/utils/Utils'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'

const Transactions = () => {

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

  )
}

export default Transactions
