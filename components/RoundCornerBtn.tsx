import Colors from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RoundCornerBtnProps = {
  text: string;
  icon: typeof MaterialIcons.defaultProps;
  onPress?: () => void;
}

const RoundCornerBtn = forwardRef<React.ElementRef<typeof TouchableOpacity>, RoundCornerBtnProps>(
  ({ text, icon, ...props }, ref) => {
    return (
      <TouchableOpacity ref={ref} style={styles.container} {...props}>
        <View style={styles.btn}>
          <MaterialIcons name={icon} size={25} color={Colors.dark} />
        </View>
        <Text style={styles.label}>{text}</Text>
      </TouchableOpacity>
    );
  }
);


RoundCornerBtn.displayName = 'RoundCornerBtn';

const BUTTON_WIDTH = 70;

const styles = StyleSheet.create({
  container: {
    width: BUTTON_WIDTH,
    alignItems: 'center',

  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: Colors.dark,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  }
})

export default RoundCornerBtn
