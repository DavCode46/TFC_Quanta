import Colors from '@/constants/Colors';
import { generalStyles } from '@/constants/Styles';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const CryptoDetail = () => {

  const { id } = useLocalSearchParams();
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)

    const fetchCryptoData = async () => {

    }
  })

  if(isLoading) {
     return (
        <View style={[generalStyles.container, { paddingTop: 60 }]}>
          <ActivityIndicator size="large" color={Colors.royalBlue} />
        </View>
        )
  }

  return (
    <View>
      <Text>CryptoDetail</Text>
    </View>
  )
}

export default CryptoDetail
