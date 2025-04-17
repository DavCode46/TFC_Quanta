import { useAuth } from '@/app/context/AuthContext'
import { validateEmail, validatePassword, validatePhoneNumber } from '@/app/utils/validations'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'



const profile = () => {

  const [image, setImage] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const currentPasswordSecureTextEntry = useMemo(() => !showCurrentPassword, [showCurrentPassword])
  const newPasswordSecureTextEntry = useMemo(() => !showNewPassword, [showNewPassword])
  const confirmNewPasswordSecureTextEntry = useMemo(() => !showConfirmNewPassword, [showConfirmNewPassword])


  const [errorPhoneNumber, setErrorPhoneNumber] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string>('')
  const [errorFullName, setErrorFullName] = useState<string>('')
  const [errorNewPassword, setErrorNewPassword] = useState<string>('')
  const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState<string>('')

  const {logout, user} = useAuth()

  useEffect(() => {
    if(user) {
      setEmail(user.email)
      setFullName(user.username)
      setPhoneNumber(user.phone)
    }
  })

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErrorEmail(validateEmail(text) ? '' : 'Email no válido');
  };

  const handleCurrentPasswordChange = (text: string) => {
    setCurrentPassword(text);
    setErrorNewPassword(
      validatePassword(text)
        ? ''
        : 'La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'
    );
  };

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
    setErrorNewPassword(
      validatePassword(text)
        ? ''
        : 'La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'
    );
  };

  const handleConfirmNewPasswordChange = (text: string) => {
    setConfirmNewPassword(text);
    setErrorConfirmNewPassword(text === newPassword ? '' : 'Las contraseñas no coinciden');
  };

  const handleFullNameChange = (text: string) => {
    setFullName(text);
    setErrorFullName(text.trim().length > 0 ? '' : 'El nombre es obligatorio');
  };

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
    setErrorPhoneNumber(validatePhoneNumber(text) ? '' : 'El teléfono debe tener 9 dígitos');
  };


  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(!permission.granted) {
      Alert.alert('Permiso denegado', 'Se necesitan permisos para acceder a la galería');
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if(!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const validateUserData = () => {
      let isValid = true;

      if (!validateEmail(email)) {
        setErrorEmail('Email no válido');
        isValid = false;
      } else {
        setErrorEmail('');
      }

      if (!validatePassword(newPassword)) {
        setErrorNewPassword('La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo');
        isValid = false;
      } else {
        setErrorNewPassword('');
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

      if (newPassword !== confirmNewPassword) {
        setErrorConfirmNewPassword('Las contraseñas no coinciden');
        isValid = false;
      } else {
        setErrorConfirmNewPassword('');
      }

      return isValid;
    };

  return (
    <View style={[generalStyles.container]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Image
            source={
              image ? { uri: image } : require('@/assets/images/avatar.webp')
            }
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={generalStyles.inputContainer}>
      <View style={generalStyles.inputWrapper}>
          <TextInput
            value={fullName}
            onChangeText={handleFullNameChange}
            style={generalStyles.input}
            placeholder='Nombre completo'
            keyboardType='default'
            editable={false}
          />
          {errorFullName ? <Text style={generalStyles.error}>{errorFullName}</Text> : null}
        </View>
        <View style={generalStyles.inputWrapper}>
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            style={generalStyles.input}
            placeholder='Email'
            keyboardType='email-address'
          />
          {errorEmail ? <Text style={generalStyles.error}>{errorEmail}</Text> : null}
        </View>
        <View style={generalStyles.inputWrapper}>
          <TextInput
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            style={generalStyles.input}
            placeholder='Teléfono'
            keyboardType='numeric'
          />
          {errorPhoneNumber ? <Text style={generalStyles.error}>{errorPhoneNumber}</Text> : null}
        </View>
        <View style={generalStyles.inputWrapper}>
            <TextInput
              value={currentPassword}
              onChangeText={handleCurrentPasswordChange}
              style={generalStyles.input}
              placeholder='Contraseña actual'
              secureTextEntry={currentPasswordSecureTextEntry}
              textContentType='oneTimeCode'
            />
            <TouchableOpacity style={generalStyles.iconButton} onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              <Ionicons name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
        <View style={generalStyles.inputWrapper}>
            <TextInput
              value={newPassword}
              onChangeText={handleNewPasswordChange}
              style={generalStyles.input}
              placeholder='Nueva Contraseña'
              secureTextEntry={newPasswordSecureTextEntry}
              textContentType='oneTimeCode'
            />
            <TouchableOpacity style={generalStyles.iconButton} onPress={() => setShowNewPassword(!showNewPassword)}>
              <Ionicons name={showNewPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          {errorNewPassword ? <Text style={generalStyles.error}>{errorNewPassword}</Text> : null}
          <View style={generalStyles.inputWrapper}>
            <TextInput
              value={confirmNewPassword}
              onChangeText={handleConfirmNewPasswordChange}
              style={[generalStyles.input, { paddingRight: 45, paddingLeft: 14 }]}
              placeholder='Confirma la nueva contraseña'
              secureTextEntry={confirmNewPasswordSecureTextEntry}
              textContentType='oneTimeCode'
            />
            <TouchableOpacity style={generalStyles.iconButton} onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
              <Ionicons name={showConfirmNewPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          {errorConfirmNewPassword ? <Text style={generalStyles.error}>{errorConfirmNewPassword}</Text> : null}
      </ScrollView>
      <TouchableOpacity
          style={[generalStyles.pillButton, { backgroundColor: Colors.royalBlue, marginBottom: 10 }]}
          onPress={() => {
            logout();
          }}>
          <Text style={generalStyles.textButton}>Actualizar Datos</Text>
        </TouchableOpacity>
      <TouchableOpacity
          style={[generalStyles.pillButton, { backgroundColor: Colors.dark, marginBottom: 10 }]}
          onPress={() => {
            logout();
          }}>
          <Text style={generalStyles.textButton}>Cerrar sesión</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default profile;
