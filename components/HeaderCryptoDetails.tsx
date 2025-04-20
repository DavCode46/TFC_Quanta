import Colors from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HeaderCryptoDetails = () => {
  return (
    <View style={styles.cryptoContainer}>
      <View style={[styles.cryptoNameContainer, styles.shadow]}>
        <Text style={{fontSize: 15, marginBottom: 10, gap: 20}}>%</Text>
       <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 20}}>
        <Text style={styles.label}>1h</Text>
        <Text style={styles.label}>24h</Text>
        <Text style={styles.label} >7d</Text>
        <Text style={styles.label}>30d</Text>
        <Text style={styles.label}>60d</Text>
        <Text style={styles.label}>90d</Text>
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
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    gap: 10
  },
  label: {
    marginRight: 10,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '400'
  }
})

export default HeaderCryptoDetails
