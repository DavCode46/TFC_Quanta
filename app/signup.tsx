import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { Link, router } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'

const signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordSecureTextEntry = useMemo(() => !showPassword, [showPassword])
  const confirmPasswordSecureTextEntry = useMemo(() => !showConfirmPassword, [showConfirmPassword])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
  }

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberRegex = /^\d{9}$/;
    return phoneNumberRegex.test(phoneNumber)
  }

  const validateUserData = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setErrorEmail('Email no válido');
      isValid = false;
    } else {
      setErrorEmail('');
    }

    if (!validatePassword(password)) {
      setErrorPassword('La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo');
      isValid = false;
    } else {
      setErrorPassword('');
    }

    if (!fullName.trim()) {
      setErrorFullName('Nombre es obligatorio');
      isValid = false;
    } else {
      setErrorFullName('');
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setErrorPhoneNumber('El teléfono debe tener 9 dígitos');
      isValid = false;
    } else {
      setErrorPhoneNumber('');
    }

    if (password !== confirmPassword) {
      setErrorConfirmPassword('Las contraseñas no coinciden');
      isValid = false;
    } else {
      setErrorConfirmPassword('');
    }

    return isValid;
  };


  // Estados para los errores
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorFullName, setErrorFullName] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');


  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErrorEmail(validateEmail(text) ? '' : 'Email no válido');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrorPassword(
      validatePassword(text)
        ? ''
        : 'La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'
    );
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setErrorConfirmPassword(text === password ? '' : 'Las contraseñas no coinciden');
  };

  const handleFullNameChange = (text: string) => {
    setFullName(text);
    setErrorFullName(text.trim().length > 0 ? '' : 'El nombre es obligatorio');
  };

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
    setErrorPhoneNumber(validatePhoneNumber(text) ? '' : 'El teléfono debe tener 9 dígitos');
  };

  const handleRegister = async () => {
    if(validateUserData()) {
      try{
        const res = await axios.post('http://127.0.0.1:3000/api/users/register', {
          username: fullName,
          email,
          password,
          confirmPassword,
          phone: phoneNumber,
        });

        console.log(res.data)

        if(res.status === 201) {
          Alert.alert('Registro exitoso', 'Usuario registrado correctamente')
          setData();
          router.push('/login');
        }
      }catch(error: any) {
        console.log('-'.repeat(100))
       console.log(error.response.data.error)
        Alert.alert('Error', error.response.data.error)
      }
    }
  }

  const setData = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setPhoneNumber('');
  }



  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={generalStyles.container}>
        <Text style={generalStyles.header}>¿Estás preparado?</Text>
        <Text style={generalStyles.descriptionText}>Regístrate y toma el control de tu dinero</Text>

        <View style={generalStyles.inputContainer}>
          <TextInput
            value={fullName}
            onChangeText={handleFullNameChange}
            style={generalStyles.input}
            placeholder='Nombre Completo'
            keyboardType='default'
          />
          {errorFullName ? <Text style={generalStyles.error}>{errorFullName}</Text> : null}
          <TextInput
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            style={generalStyles.input}
            placeholder='Teléfono'
            keyboardType='numeric'
          />
          {errorPhoneNumber ? <Text style={generalStyles.error}>{errorPhoneNumber}</Text> : null}
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            style={generalStyles.input}
            placeholder='Email'
            keyboardType='email-address'
          />
          {errorEmail ? <Text style={generalStyles.error}>{errorEmail}</Text> : null}
          <View style={generalStyles.inputWrapper}>
            <TextInput
              value={password}
              onChangeText={handlePasswordChange}
              style={generalStyles.input}
              placeholder='Contraseña'
              secureTextEntry={passwordSecureTextEntry}
              textContentType='oneTimeCode'
            />

            <TouchableOpacity style={generalStyles.iconButton} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          {errorPassword ? <Text style={generalStyles.error}>{errorPassword}</Text> : null}
          <View style={generalStyles.inputWrapper}>
            <TextInput
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              style={[generalStyles.input, { paddingRight: 45, paddingLeft: 14 }]}
              placeholder='Confirma la contraseña'
              secureTextEntry={confirmPasswordSecureTextEntry}
              textContentType='oneTimeCode'
            />
            <TouchableOpacity style={generalStyles.iconButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          {errorConfirmPassword ? <Text style={generalStyles.error}>{errorConfirmPassword}</Text> : null}
        </View>

        <View style={{ flex: 1 }} >
          <TouchableOpacity
            style={[generalStyles.pillButton, { backgroundColor: Colors.royalBlue, marginBottom: 20 }]}
            onPress={() => {
              handleRegister()
            }}
          >
            <Text style={generalStyles.textButton}>Crear cuenta</Text>
          </TouchableOpacity>
          <Link href={'/login'} asChild>
            <TouchableOpacity>
              <Text style={generalStyles.link}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}



export default signup
