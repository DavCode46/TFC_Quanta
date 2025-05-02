import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu'

import env from '@/app/config/envConfig'
import { useAuth } from '@/app/context/AuthContext'
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validatePhoneNumber,
} from '@/app/utils/validations'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'

const MaterialMenu = (Menu as unknown) as React.ComponentType<any>

const profile = () => {
  const [image, setImage] = useState<string | null>(null)
  const [fileList, setFileList] = useState<any[]>([])
  const [isImageLoading, setIsImageLoading] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const [errorFullName, setErrorFullName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('')
  const [errorNewPassword, setErrorNewPassword] = useState('')
  const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState('')

  const hasErrors =
    !!(
      errorEmail ||
      errorPhoneNumber ||
      errorCurrentPassword ||
      errorNewPassword ||
      errorConfirmNewPassword
    )

  const [isLoading, setIsLoading] = useState(false)


  const { user, logout, updateUser } = useAuth()


  useEffect(() => {
    if (user) {
      setEmail(user.email || '')
      setFullName(user.username || '')
      setPhoneNumber(user.phone || '')
    }
  }, [user])


  const handleFullNameChange = (text: string) => {
    setFullName(text)
    setErrorFullName(
      validateFullName(text) ? '' : 'El nombre es obligatorio'
    )
  }
  const handleEmailChange = (text: string) => {
    setEmail(text)
    setErrorEmail(validateEmail(text) ? '' : 'Email no válido')
  }
  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text)
    setErrorPhoneNumber(
      validatePhoneNumber(text) ? '' : 'El teléfono debe tener 9 dígitos'
    )
  }
  const handleCurrentPasswordChange = (text: string) => {
    setCurrentPassword(text)
  }
  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text)
    setErrorNewPassword(
      validatePassword(text)
        ? ''
        : 'La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'
    )
  }
  const handleConfirmNewPasswordChange = (text: string) => {
    setConfirmNewPassword(text)
    setErrorConfirmNewPassword(
      text === newPassword ? '' : 'Las contraseñas no coinciden'
    )
  }

  const validateUserData = () => {
    let isValid = true

    if (!validateEmail(email)) {
      setErrorEmail('Email no válido')
      isValid = false
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorPhoneNumber('El teléfono debe tener 9 dígitos')
      isValid = false
    }
    if (newPassword && !validatePassword(newPassword)) {
      setErrorNewPassword(
        'La contraseña debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'
      )
      isValid = false
    }
    if (newPassword !== confirmNewPassword) {
      setErrorConfirmNewPassword('Las contraseñas no coinciden')
      isValid = false
    }

    return isValid
  }

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      Alert.alert(
        'Permiso denegado',
        'Se necesitan permisos para acceder a la galería'
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const asset = result.assets[0]
      setImage(asset.uri)
      const file = {
        uri: asset.uri,
        name: asset.uri.split('/').pop(),
        type: asset.type || 'image/jpeg',
      }
      setFileList((prev) => [...prev, file])
    }
  }


  const handleUploadImage = async () => {
    if (!fileList.length) {
      Alert.alert('Error', 'Selecciona una imagen primero')
      return
    }
    try {
      setIsImageLoading(true)
      const data = new FormData()
      fileList.forEach((file) =>
        data.append('profileImage', file as any)
      )
      const res = await axios.post(
        `${env.API_URL}/users/change-image/${user?.email}`,
        data,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (res.status === 200) {
        updateUser({ profileImage: res.data.profileImage })
        Alert.alert('Éxito', 'Imagen actualizada correctamente')
      }
    } catch (err: any) {
      Alert.alert(
        'Error',
        err.response?.data?.error || 'Error al subir la imagen'
      )
    } finally {
      setFileList([])
      setIsImageLoading(false)
    }
  }


  const handleUpdateData = async () => {
    if (!validateUserData()) return

    const payload: any = {
      userId: user?.id,
      email,
      phone: phoneNumber,
      currentPassword,
    }
    if (newPassword) payload.newPassword = newPassword

    try {
      setIsLoading(true)
      const res = await axios.patch(
        `${env.API_URL}/users/update`,
        payload,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      if (res.status === 200) {
        Alert.alert(
          'Operación realizada con éxito',
          'Datos actualizados correctamente'
        )
        resetData()
        logout(false)
      }
    } catch (err: any) {
      Alert.alert('Ha ocurrido un error', err.response?.data?.error)
    } finally {
      setIsLoading(false)
    }
  }


  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await axios.delete(
                `${env.API_URL}/users/delete/${user?.id}`,
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ${user?.token}`,
                  },
                }
              )
              if (res.status === 200) {
                Alert.alert('Éxito', res.data.message)
                logout(true)
              }
            } catch(error: any) {
              Alert.alert('Error', error.response.data.error)
            }
          },
        },
      ],
      { cancelable: false }
    )
  }


  const resetData = () => {
    setFullName('')
    setEmail('')
    setPhoneNumber('')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }


  const menuRef = useRef<any>(null)
  const showMenu = () => menuRef.current?.show()
  const hideMenu = () => menuRef.current?.hide()

  return (
    <View style={generalStyles.container}>

      <View style={styles.profileHeader}>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.imagePicker}
        >
          <Image
            source={
              image
                ? { uri: image }
                : user?.profileImage
                ? {
                    uri: `${env.ASSETS_URL}/uploads/${user.profileImage}`,
                  }
                : require('@/assets/images/avatar.webp')
            }
            style={styles.image}
          />
        </TouchableOpacity>

        <MaterialMenu
          ref={menuRef}
          anchor={
            <TouchableOpacity
              onPress={showMenu}
              style={styles.menuButton}
            >
              <MaterialIcons
                name="settings"
                size={28}
                color={Colors.dark}
              />
            </TouchableOpacity>
          }
          onRequestClose={hideMenu}
          animationDuration={200}
        >
          <MenuItem
            onPress={() => {
              hideMenu()
              logout(false)
            }}
          >
            Cerrar sesión
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onPress={() => {
              hideMenu()
              handleDeleteAccount()
            }}
            textStyle={{ color: Colors.red }}
          >
            Eliminar cuenta
          </MenuItem>
        </MaterialMenu>
      </View>


      <TouchableOpacity
        style={[
          generalStyles.buttonSm,
          { backgroundColor: Colors.royalBlue, marginBottom: 10, alignSelf: 'center' },
        ]}
        onPress={handleUploadImage}
      >
        {isImageLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={generalStyles.textButton}>
            Cambiar imagen
          </Text>
        )}
      </TouchableOpacity>

      <ScrollView style={generalStyles.inputContainer}>
        <View style={generalStyles.inputWrapper}>
          <TextInput
            value={fullName}
            onChangeText={handleFullNameChange}
            style={generalStyles.input}
            placeholder="Nombre completo"
            editable={false}
          />
          {errorFullName ? (
            <Text style={generalStyles.error}>
              {errorFullName}
            </Text>
          ) : null}
        </View>

        <View style={generalStyles.inputWrapper}>
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            style={generalStyles.input}
            placeholder="Email"
            keyboardType="email-address"
          />
          {errorEmail ? (
            <Text style={generalStyles.error}>{errorEmail}</Text>
          ) : null}
        </View>

        <View style={generalStyles.inputWrapper}>
          <TextInput
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            style={generalStyles.input}
            placeholder="Teléfono"
            keyboardType="numeric"
          />
          {errorPhoneNumber ? (
            <Text style={generalStyles.error}>
              {errorPhoneNumber}
            </Text>
          ) : null}
        </View>

        <View style={generalStyles.inputWrapper}>
          <TextInput
            value={currentPassword}
            onChangeText={handleCurrentPasswordChange}
            style={generalStyles.input}
            placeholder="Contraseña actual"
            secureTextEntry={!showCurrentPassword}
            textContentType="oneTimeCode"
          />
          <TouchableOpacity
            style={generalStyles.iconButton}
            onPress={() =>
              setShowCurrentPassword((v) => !v)
            }
          >
            <Ionicons
              name={
                showCurrentPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {errorCurrentPassword ? (
          <Text style={generalStyles.error}>
            {errorCurrentPassword}
          </Text>
        ) : null}

        <View style={generalStyles.inputWrapper}>
          <TextInput
            value={newPassword}
            onChangeText={handleNewPasswordChange}
            style={generalStyles.input}
            placeholder="Nueva contraseña"
            secureTextEntry={!showNewPassword}
            textContentType="oneTimeCode"
          />
          <TouchableOpacity
            style={generalStyles.iconButton}
            onPress={() =>
              setShowNewPassword((v) => !v)
            }
          >
            <Ionicons
              name={
                showNewPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {errorNewPassword ? (
          <Text style={generalStyles.error}>
            {errorNewPassword}
          </Text>
        ) : null}

        <View style={generalStyles.inputWrapper}>
          <TextInput
            value={confirmNewPassword}
            onChangeText={handleConfirmNewPasswordChange}
            style={[
              generalStyles.input,
              { paddingRight: 45, paddingLeft: 14 },
            ]}
            placeholder="Confirma la nueva contraseña"
            secureTextEntry={!showConfirmNewPassword}
            textContentType="oneTimeCode"
          />
          <TouchableOpacity
            style={generalStyles.iconButton}
            onPress={() =>
              setShowConfirmNewPassword((v) => !v)
            }
          >
            <Ionicons
              name={
                showConfirmNewPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {errorConfirmNewPassword ? (
          <Text style={generalStyles.error}>
            {errorConfirmNewPassword}
          </Text>
        ) : null}
      </ScrollView>

      <TouchableOpacity
        disabled={hasErrors}
        style={[
          generalStyles.button,
          {
            backgroundColor: hasErrors
              ? Colors.gray
              : Colors.royalBlue,
            marginBottom: 10,
          },
        ]}
        onPress={handleUpdateData}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={generalStyles.textButton}>
            Actualizar datos
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  imagePicker: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  menuButton: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
})

export default profile
