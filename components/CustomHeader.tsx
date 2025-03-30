import Colors from '@/constants/Colors';
import { generalStyles } from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomHeader = () => {
  const insets = useSafeAreaInsets();
  const adjustedTop = Math.min(insets.top, 20);
  return (
    <BlurView intensity={60} tint={'light'} style={{ paddingTop: adjustedTop }}>
      <View style={[styles.container, styles.shadow]}>
        <Link href='/(auth)/(profile)/help' asChild>
          <TouchableOpacity>
            <Text style={[generalStyles.roundBtn, styles.shadow, styles.roundBtnSize]}>
              <Ionicons name="help" size={20} color={Colors.dark} />
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href='/(auth)/(profile)/profile' asChild>
          <TouchableOpacity>
            <Text style={[generalStyles.roundBtn, styles.shadow, styles.roundBtnSize]}>DM</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    height: 60,
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
  },
  roundBtnSize: {
    height: 40,
    width: 40,
  }
})

export default CustomHeader
