import Colors from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HeaderCrypto = () => {
  return (
    <View style={styles.cryptoContainer}>
      <View style={[styles.cryptoNameContainer, styles.shadow]}>
        <Text style={{marginRight: 10, marginBottom: 10, fontSize: 12, fontWeight: '400' }}>#</Text>
        <View style={{gap: 5, marginBottom: 10,}}>
          <Text style={styles.title}>Market cap</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end', flexDirection: 'row', justifyContent:'space-between', gap: 30}}>
        <Text style={[styles.price, {marginBottom: 10, fontWeight:'400'}]}>Precio</Text>
        <View style={styles.quoteContainer}>
          <Text style={{marginBottom: 10, fontWeight:'400'}}>24h %</Text>
        </View>
      </View>
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
    fontWeight: '400'
  },
  symbol: {
    fontSize: 12
  },
  price: {

  }
})

export default HeaderCrypto
