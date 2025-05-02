import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  value: number
}

const PercentageChange = ({ value }: Props) => {
  const isPositive = value > 0;
  const iconName = isPositive ? 'arrow-drop-up' : 'arrow-drop-down';
  const color = isPositive ? 'green' : 'red';

  return (
    <View style={styles.container}>
      <MaterialIcons name={iconName} size={15} color={color} />
      <Text style={[styles.text, { color }]}>
        {value.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default PercentageChange;
