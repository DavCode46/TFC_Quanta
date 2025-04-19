import { useAuth } from '@/app/context/AuthContext';
import Colors from '@/constants/Colors';
import { generalStyles } from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomHeader = () => {
  const { user } = useAuth();
  const initials = user?.username.charAt(0).toUpperCase() + user?.username.charAt(1).toUpperCase();
  const insets = useSafeAreaInsets();
  const adjustedTop = Math.min(insets.top, 80);
  return (
    <BlurView intensity={70} tint={'systemThickMaterialLight'} style={{ paddingTop: adjustedTop }}>
      <View style={[styles.container, styles.shadow]}>
        <Link href='/(auth)/(profile)/Profile' style={{marginRight: 20}} asChild>
          <TouchableOpacity>
            <Text style={[generalStyles.roundCornerBtn, styles.shadow, styles.roundBtnSize]}>{initials}</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
