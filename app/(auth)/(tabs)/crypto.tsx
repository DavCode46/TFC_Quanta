import env from '@/app/config/envConfig'
import { useAuth } from '@/app/context/AuthContext'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Text, View } from 'react-native'

const crypto = () => {
  const [crypto, setCrypto] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { user } = useAuth();


  useEffect(() => {
    const fetchCryptoData = async () => {
      setIsLoading(true)
      try{
        const res = await axios.get(`${env.API_URL}/cryptos/data`,{
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        })
        const { cryptoData } = res.data
        setCrypto(cryptoData)
      }catch(error: any) {
        Alert.alert('Ha ocurrido un error', error.response.data.error)
      }finally {
        setIsLoading(false)
      }
    }
    fetchCryptoData();

    console.log('Crypto data fetched', crypto)
  }, [])

  if(isLoading) {
      return (
            <View style={[generalStyles.container, { paddingTop: 60 }]}>
              <ActivityIndicator size="large" color={Colors.royalBlue} />
            </View>
          )

        }

  return (
    <View style={generalStyles.container}>
      <Text style={generalStyles.header}>Crypto</Text>
    </View>
  )
}

export default crypto
