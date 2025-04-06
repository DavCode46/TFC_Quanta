import Colors from '@/constants/Colors';
import React, { FC } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RadioButtonProps {
  selected: boolean;
  onPress: (e: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const RadioButton = ({ selected, onPress, children }: RadioButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioContainer}>
      <View style={[styles.radioCircle, selected ? styles.radioSelected : styles.radioUnselected]} />
      <Text style={styles.radioText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: Colors.royalBlue,
  },
  radioUnselected: {
    backgroundColor: '#fff',
  },
  radioText: {
    fontSize: 16,
  },
});

export default RadioButton;
