import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import axios from 'axios'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import env from './config/envConfig'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleResetPassword = async () => {
    if (!email) {
      setError('Por favor ingresa tu email.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {

      const { data } = await axios.post(
        `${env.API_URL}/password/forgot`,
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      setSuccess(data.message || 'Revisa tu correo para el enlace de reinicio.')

      router.push('/ResetPassword')

    } catch (err) {
      console.log(err)
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Error al solicitar el reinicio.')
      } else {
        setError('Ha ocurrido un error. Intenta más tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={[generalStyles.container, { alignContent: 'center', justifyContent: 'center' }]}>
      <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>

      <TextInput
        style={[generalStyles.input, { marginBottom: 12 }]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}

      <TouchableOpacity
        style={[generalStyles.button, {backgroundColor: Colors.royalBlue}]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator />
          : <Text style={generalStyles.textButton}>Enviar código</Text>
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  title: {
    fontSize: 22,
    marginBottom: 12,
    textAlign: 'center',
  },
  error: {
    color: '#c00',
    marginTop: 4,
  },
  success: {
    color: 'green',
    marginTop: 4,
  },
})

export default ForgotPassword
