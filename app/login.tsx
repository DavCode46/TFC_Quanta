import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'

import env from '@/app/config/envConfig'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { Link, router } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from './context/AuthContext'
const login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const { login } = useAuth()

  const passwordSecureEntry = useMemo(() => !showPassword, [showPassword])

  const handleLogin = async () => {

      try{
        const res = await axios.post(`${env.API_URL}/users/login`, {
          email,
          password,
        });

        if(res.status === 200) {
          Alert.alert('Inicio de sesión exitoso', 'Has iniciado sesión correctamente')
          setData();
          login(res.data)
        }
      }catch(error: any) {
        console.log('-'.repeat(100))
       console.log(error.response.data.error)
        Alert.alert('Error', error.response.data.error)
      }

  }

  const setData = () => {
    setEmail('');
    setPassword('');
  }


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={generalStyles.container}>
        <Text style={generalStyles.header}>Bienvenido de nuevo</Text>
        <Text style={generalStyles.descriptionText}>Inicia sesión para continuar</Text>

        <View style={generalStyles.inputContainer}>
          <TextInput
            style={generalStyles.input}
            placeholder='Email'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />

          <View style={generalStyles.inputWrapper}>
            <TextInput
              style={generalStyles.input}
              placeholder='Contraseña'
              keyboardType='default'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={passwordSecureEntry}
              textContentType='oneTimeCode'
            />
            <TouchableOpacity style={generalStyles.iconButton} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color='gray' />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[generalStyles.pillButton, { backgroundColor: Colors.royalBlue, marginBottom: 10 }]} onPress={() => {
          handleLogin()
        }} >
          <Text style={generalStyles.textButton}>Iniciar sesión</Text>
        </TouchableOpacity>

        <Link href={'/SignUp'} replace asChild>
          <TouchableOpacity>
            <Text style={generalStyles.link}>
              ¿Aún no tienes una cuenta? Regístrate
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  )
}

export default login
