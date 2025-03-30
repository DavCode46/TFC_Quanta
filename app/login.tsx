import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'

const login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const passwordSecureEntry = useMemo(() => !showPassword, [showPassword])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
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

        <TouchableOpacity style={[generalStyles.pillButton, { backgroundColor: Colors.royalBlue, marginBottom: 10 }]} onPress={() => { }} >
          <Text style={generalStyles.textButton}>Iniciar sesión</Text>
        </TouchableOpacity>

        <Link href={'/signup'} replace asChild>
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
