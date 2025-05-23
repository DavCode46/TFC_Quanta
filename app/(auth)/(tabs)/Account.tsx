import env from '@/app/config/envConfig'
import { useAuth } from '@/app/context/AuthContext'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Account = () => {
  const [image, setImage] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [account, setAccount] = useState('')
  const [loading, setLoading] = useState(true)

  const { user, setAccountData, reloadFlag, logout } = useAuth()
  const formattedBalance = balance.toFixed(2).replace('.', ',')

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const accountRes = await axios.get(
          `${env.API_URL}/accounts/get/${user.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        const { account } = accountRes.data
        if (account) {
          const { balance, account_number } = account
          setAccountData(account)
          setBalance(balance)
          setAccount(account_number)
        }
      } catch (error: any) {
        console.error('Error loading account:', error.response?.data?.error || error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user, reloadFlag])

  if (loading) {
    return (
      <View style={[generalStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.royalBlue} />
      </View>
    )
  }

  return (
    <ScrollView style={[generalStyles.container, {paddingTop: 120}]} contentContainerStyle={styles.content}>
      <Image
        source={
          image
            ? { uri: image }
            : user?.profileImage
            ? { uri: `${env.ASSETS_URL}/uploads/${user.profileImage}` }
            : require('@/assets/images/avatar.webp')
        }
        style={styles.avatar}
      />

      <View style={styles.card}>
        <Text style={styles.infoLabel}>Número de cuenta</Text>
        <Text style={styles.infoValue}>{account}</Text>

        <Text style={styles.infoLabel}>Nombre</Text>
        <Text style={styles.infoValue}>{user.username}</Text>

        <Text style={styles.infoLabel}>Teléfono</Text>
        <Text style={styles.infoValue}>{user.phone}</Text>

        <Text style={styles.infoLabel}>Saldo</Text>
        <Text style={styles.infoValue}>{formattedBalance} €</Text>
      </View>

       <TouchableOpacity
              style={[
                generalStyles.button,
                { backgroundColor: Colors.royalBlue, marginTop: 20, width: '90%' },
              ]}
              onPress={() => logout(false)}
            >
               <Text style={generalStyles.textButton}>Cerrar sesión</Text>
            </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: Colors.background,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: Colors.royalBlue,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 12,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
    marginTop: 4,
  },
})

export default Account
