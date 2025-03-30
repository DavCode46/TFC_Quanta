import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CircleBtnProps = {
  text: string;
  icon: typeof Ionicons.defaultProps;
  onPress?: () => void;
}

const CircleBtn = ({ text, icon, onPress }: CircleBtnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.roundBtn}>
        <Ionicons name={icon} size={25} color={Colors.dark} />
      </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10
  },
  roundBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: Colors.dark,
    fontSize: 14,
    fontWeight: '500'
  }
})

export default CircleBtn
