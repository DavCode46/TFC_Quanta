import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
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

  // Validaciones en tiempo real
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

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>¿Estás preparado?</Text>
        <Text style={defaultStyles.descriptionText}>Regístrate y toma el control de tu dinero</Text>

        <View style={defaultStyles.inputContainer}>
          <TextInput
            value={fullName}
            onChangeText={handleFullNameChange}
            style={defaultStyles.input}
            placeholder='Nombre Completo'
            keyboardType='default'
          />
          {errorFullName ? <Text style={styles.error}>{errorFullName}</Text> : null}
          <TextInput
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            style={defaultStyles.input}
            placeholder='Teléfono'
            keyboardType='numeric'
          />
          {errorPhoneNumber ? <Text style={styles.error}>{errorPhoneNumber}</Text> : null}
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            style={defaultStyles.input}
            placeholder='Email'
            keyboardType='email-address'
          />
          {errorEmail ? <Text style={styles.error}>{errorEmail}</Text> : null}
          <View style={defaultStyles.inputWrapper}>
            <TextInput
              value={password}
              onChangeText={handlePasswordChange}
              style={defaultStyles.input}
              placeholder='Contraseña'
              secureTextEntry={passwordSecureTextEntry}
              textContentType='oneTimeCode'
            />

            <TouchableOpacity style={defaultStyles.iconButton} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          {errorPassword ? <Text style={styles.error}>{errorPassword}</Text> : null}
          <View style={defaultStyles.inputWrapper}>
            <TextInput
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              style={[defaultStyles.input, { paddingRight: 45, paddingLeft: 14 }]}
              placeholder='Confirma la contraseña'
              secureTextEntry={confirmPasswordSecureTextEntry}
              textContentType='oneTimeCode'
            />
            <TouchableOpacity style={defaultStyles.iconButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          {errorConfirmPassword ? <Text style={styles.error}>{errorConfirmPassword}</Text> : null}
        </View>

        <View style={{ flex: 1 }} >
          <TouchableOpacity
            style={[defaultStyles.pillButton, { backgroundColor: Colors.royalBlue, marginBottom: 20 }]}
            onPress={() => {
              if (validateUserData()) {
                Alert.alert('Registro exitoso', 'Cuenta correctamente')
              }
            }}
          >
            <Text style={defaultStyles.buttonText}>Crear cuenta</Text>
          </TouchableOpacity>
          <Link href={'/login'} asChild>
            <TouchableOpacity>
              <Text style={defaultStyles.textLink}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginTop: 10
  },
})

export default signup
