import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';


const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={
        {
          tabBarActiveTintColor: Colors.royalBlue,
          tabBarBackground: () => (
            <BlurView
              intensity={90}
              tint='light'
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.1'
              }}
            />
          ),
          tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }
        }
      }

    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name='home' size={size} color={color} />
          ),
          headerTransparent: true,
          header: () => {
            return (
              <View style={{ backgroundColor: 'white', padding: 20 }}>
                <Text>To Do</Text>
              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="operations"
        options={{
          title: 'Saldo',
          tabBarIcon: ({ size, color }) => (
            <Fontisto name="money-symbol" size={size} color={color} />
          ),
          headerTransparent: true,
          header: () => {
            return (
              <View style={{ backgroundColor: 'white', padding: 20 }}>
                <Text>To Do</Text>
              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: 'Transferencias',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name='money-bill-transfer' size={size} color={color} />
          ),
          headerTransparent: true,
          header: () => {
            return (
              <View style={{ backgroundColor: 'white', padding: 20 }}>
                <Text>To Do</Text>
              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: 'Crypto',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name='bitcoin' size={size} color={color} />
          ),
          headerTransparent: true,
          header: () => {
            return (
              <View style={{ backgroundColor: 'white', padding: 20 }}>
                <Text>To Do</Text>
              </View>
            )
          }
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
