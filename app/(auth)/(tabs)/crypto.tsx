import env from '@/app/config/envConfig'
import { useAuth } from '@/app/context/AuthContext'
import HeaderCrypto from '@/components/HeaderCrypto'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import axios from 'axios'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

          <HeaderCrypto />
          {cryptoData.map((crypto: any, index: any) => {
            const fullData = completeCryptoData?.[crypto.id];
            return (
              <View key={crypto.id} style={styles.cryptoContainer}>

                <View style={[styles.cryptoNameContainer, styles.shadow]}>
                <Text style={{marginRight: 10, fontSize: 12, fontWeight: '200' }}>{index + 1}</Text>
                   {fullData && (
                  <Image
                    source={{ uri: fullData.logo }}
                    style={{ width: 32, height: 32, marginBottom: 8 }}
                  />
                )}
                <View style={{gap: 5}}>
                  <Text style={styles.title}>{crypto.symbol}</Text>
                  <Text style={styles.dominance}>{crypto.quote.EUR.market_cap_dominance.toFixed(2)}B</Text>
                </View>
                <Link  href={`/crypto/${crypto.id}`} asChild>
                  <TouchableOpacity style={styles.detailButton}>
                    <MaterialIcons
                      name="remove-red-eye"
                      size={20}
                      color={Colors.royalBlue}
                    />
                    {/*
                    <Text style={{color: Colors.royalBlue, fontSize: 12}}>Ver</Text>
                   */}

                  </TouchableOpacity>
                </Link>
                </View>

                <View style={{alignItems: 'center',justifyContent: 'center', flexDirection: 'row', gap: 5}}>
                  <Text style={styles.price}>{crypto.quote.EUR.price.toFixed(2)} €</Text>
                  <View style={styles.quoteContainer}>

                  <MaterialIcons
                      name={crypto.quote.EUR.percent_change_24h > 0 ? 'arrow-drop-up' : 'arrow-drop-down'}
                      size={30}
                      color={crypto.quote.EUR.percent_change_24h > 0 ? 'green' : 'red'}
                    />
                  <Text style={styles.price}>{crypto.quote.EUR.percent_change_24h.toFixed(2)} %</Text>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    borderRadius: 10,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 2,
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
    fontWeight: '700'
  },
  dominance: {
    fontSize: 12,
    color: Colors.gray
  },
  price: {
    fontSize: 13,
    fontWeight: '400'
  },
  detailButton: {
  }
})

export default Crypto;
