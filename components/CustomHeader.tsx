import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <Link href='/(auth)/(profile)/help' asChild>
        <TouchableOpacity>
          <Text style={[styles.roundBtn, styles.shadow]}>
            <Ionicons name="help" size={20} color={Colors.dark} />
          </Text>
        </TouchableOpacity>
      </Link>
      <Link href='/(auth)/(profile)/profile' asChild>
        <TouchableOpacity>
          <Text style={[styles.roundBtn, styles.shadow]}>DM</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
  roundBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    color: Colors.dark,
    borderRadius: 50,
    padding: 10,
    height: 40,
    width: 40,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})

export default CustomHeader
