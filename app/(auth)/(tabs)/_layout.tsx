import CustomHeader from '@/components/CustomHeader';
import ProtectedRoute from '@/components/ProtectedRoute';
import Colors from '@/constants/Colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';


const TabsLayout = () => {
  return (
    <ProtectedRoute>
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
                    backgroundColor: 'rgba(0,0,0,0.1)'
                  }}
                />
              ),
              tabBarStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
              },

            }
          }

        >
          <Tabs.Screen
            name="Home"
            options={{
              title: 'Inicio',
              tabBarIcon: ({ size, color }) => (
                <MaterialIcons name="account-balance" size={size} color={color} />
              ),

              headerTransparent: true,
              header: () => <CustomHeader />,
              headerRight: () => (
                <Link href={'/Help'} asChild>
                  <TouchableOpacity>
                    <Ionicons name="help-circle-outline" size={30} color={Colors.dark} />
                  </TouchableOpacity>
                </Link>
              ),
            }}
          />

          <Tabs.Screen
            name="Transfers"
            options={{
              title: 'Transferencias',
              tabBarIcon: ({ size, color }) => (
                <FontAwesome6 name='money-bill-transfer' size={size} color={color} />
              ),
              headerTransparent: true,
              header: () => <CustomHeader />,
              headerRight: () => (
                <Link href={'/Help'} asChild>
                  <TouchableOpacity>
                    <Ionicons name="help-circle-outline" size={30} color={Colors.dark} />
                  </TouchableOpacity>
                </Link>
              ),
            }}
          />
          <Tabs.Screen
            name="Crypto"
            options={{
              title: 'Crypto',
              tabBarIcon: ({ size, color }) => (
                <FontAwesome6 name="bitcoin" size={size} color={color} />
              ),
              headerTransparent: true,
              header: () => <CustomHeader />,
              headerRight: () => (
                <Link href={'/Help'} asChild>
                  <TouchableOpacity>
                    <Ionicons name="help-circle-outline" size={30} color={Colors.dark} />
                  </TouchableOpacity>
                </Link>
              ),
            }}
          />
        </Tabs>
    </ProtectedRoute>
  )
}

export default TabsLayout
