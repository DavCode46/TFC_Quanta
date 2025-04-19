import env from '@/app/config/envConfig'
import { useAuth } from '@/app/context/AuthContext'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Crypto = () => {
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [completeCryptoData, setCompleteCryptoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();


  useEffect(() => {
    const fetchCryptoData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${env.API_URL}/cryptos/data`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });

        setCryptoData(res.data);
      } catch (error: any) {
        Alert.alert('Ha ocurrido un error', error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  useEffect(() => {
    const fetchCompleteCryptoData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${env.API_URL}/cryptos/complete-data`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });

        setCompleteCryptoData(res.data);
      } catch (error: any) {
        Alert.alert('Ha ocurrido un error', error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompleteCryptoData();
  }, []);

  if (isLoading) {
    return (
      <View style={[generalStyles.container, { paddingTop: 60 }]}>
        <ActivityIndicator size="large" color={Colors.royalBlue} />
      </View>
    );
  }

  return (
    <ScrollView style={generalStyles.container} contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: insets.bottom + 50 }}>
      {cryptoData ? (
        <View>
          <Text style={generalStyles.header}>Criptomonedas</Text>
          {cryptoData.map((crypto: any) => {
            const fullData = completeCryptoData?.[crypto.id]; // Busca por id
            return (
              <View key={crypto.id} style={styles.cryptoContainer}>

                <View style={styles.cryptoNameContainer}>
                   {fullData && (
                  <Image
                    source={{ uri: fullData.logo }}
                    style={{ width: 32, height: 32, marginBottom: 8 }}
                  />
                )}
                <View style={{gap: 5}}>
                  <Text style={styles.title}>{crypto.name}</Text>
                  <Text style={styles.symbol}>{crypto.symbol}</Text>
                </View>
                </View>

                <View style={{alignItems: 'flex-end', gap: 5}}>
                  <Text style={styles.price}>{crypto.quote.EUR.price.toFixed(2)} €</Text>
                  <View style={styles.quoteContainer}>

                  <MaterialIcons
                      name={crypto.quote.EUR.percent_change_24h > 0 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                      size={30}
                      color={crypto.quote.EUR.percent_change_24h > 0 ? 'green' : 'red'}
                    />
                  <Text>{crypto.quote.EUR.percent_change_24h}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={generalStyles.header}>No se pudo cargar la información de criptomonedas</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cryptoContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10
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
    fontWeight: '700'
  },
  symbol: {
    fontSize: 12
  },
  price: {

  }
})

export default Crypto;
