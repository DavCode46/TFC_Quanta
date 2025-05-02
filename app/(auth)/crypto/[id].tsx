import env from '@/app/config/envConfig';
import { useAuth } from '@/app/context/AuthContext';
import HeaderCryptoDetails from '@/components/HeaderCryptoDetails';
import PercentageChange from '@/components/PercentChange';
import Colors from '@/constants/Colors';
import { generalStyles } from '@/constants/Styles';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';

const CryptoDetail = () => {
  const { user } = useAuth();

  const { id } = useLocalSearchParams();
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [completeCryptoData, setCompleteCryptoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)

    const fetchCryptoData = async () => {
        try{
            const res = await axios.get(`${env.API_URL}/cryptos/data/${id}`,
              {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${user?.token}`
                }
              }
            )
            setCryptoData(res.data)
        }catch(error: any) {
          console.log(error)
          Alert.alert("Ha ocurrido un error", error.response.data.error)
        }
    }

    const fetchCompleteCryptoData = async () => {
      try{
        const res = await axios.get(`${env.API_URL}/cryptos/complete-data/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.token}`
            }
          }
        )
        setCompleteCryptoData(res.data)
      }catch(error: any) {
        console.log(error)
        Alert.alert("Ha ocurrido un error", error.response.data.error)
      }
    }
    fetchCryptoData()
    fetchCompleteCryptoData()
    setIsLoading(false)
  }, [id])

  if(isLoading) {
     return (
        <View style={[generalStyles.container, { paddingTop: 60 }]}>
          <ActivityIndicator size="large" color={Colors.royalBlue} />
        </View>
        )
  }

  return (
    <View style={generalStyles.container}>
       {cryptoData ? (
      <View style={{flexDirection: 'column', gap: 10}}>
        <View style={[styles.cryptoContainer, styles.shadow]}>
          <View style={styles.cryptoNameContainer}>
          {completeCryptoData?.logo && (
              <Image
                source={{ uri: completeCryptoData.logo }}
                style={{ width: 40, height: 40, marginBottom: 8 }}
              />
              )}
            <Text style={styles.title}>{cryptoData.name}</Text>
            <Text style={styles.id}># {id}</Text>
          </View>
        </View>
        <View
          style={[{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            gap: 5,
            marginLeft: 20,
          }]}
        >
          <Text style={styles.price}>
            {cryptoData.quote.EUR.price.toFixed(2)} €
          </Text>
          <View style={styles.quoteContainer}>
            <MaterialIcons
              name={
                cryptoData.quote.EUR.percent_change_24h > 0
                  ? 'arrow-drop-up'
                  : 'arrow-drop-down'
              }
              size={30}
              color={
                cryptoData.quote.EUR.percent_change_24h > 0 ? 'green' : 'red'
              }
            />
            <Text style={[styles.dominance, {color: `${
              cryptoData.quote.EUR.percent_change_24h > 0 ? 'green' : 'red'}`}]}>
              {cryptoData.quote.EUR.percent_change_24h.toFixed(2)} %
            </Text>
          </View>
        </View>

        <View style={[styles.descriptionContainer, styles.shadow]}>
          <Text style={styles.description}>
            {completeCryptoData?.description}
          </Text>
        </View>
        <HeaderCryptoDetails />
         <View style={styles.cryptoContainer}>
        <View style={[styles.cryptoNameContainer, styles.shadow]}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <PercentageChange value={cryptoData.quote.EUR.percent_change_1h} />
            <PercentageChange value={cryptoData.quote.EUR.percent_change_24h} />
            <PercentageChange value={cryptoData.quote.EUR.percent_change_7d} />
            <PercentageChange value={cryptoData.quote.EUR.percent_change_30d} />
            <PercentageChange value={cryptoData.quote.EUR.percent_change_60d} />
            <PercentageChange value={cryptoData.quote.EUR.percent_change_90d} />
          </View>
        </View>
      </View>
    </View>
) : (
  <Text style={generalStyles.header}>
    No se pudo cargar la información de criptomonedas
  </Text>
  )}
</View>
  )
}


const styles = StyleSheet.create({
  cryptoContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderRadius: 10,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 2,
  },
  id: {
    backgroundColor: Colors.lightGray,
    borderRadius: 50,
    padding: 5,
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '700',
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  cryptoNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 15,
    fontWeight: '500'
  },
  dominance: {
    fontSize: 12,
    color: Colors.gray
  },
  price: {
    fontSize: 20,
    fontWeight: '400'
  },
  descriptionContainer: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 2,
  },
  description: {
    marginVertical: 10,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '400',
    color: Colors.gray,
    paddingHorizontal: 20,
    textAlign: 'justify',
  }
})

export default CryptoDetail
