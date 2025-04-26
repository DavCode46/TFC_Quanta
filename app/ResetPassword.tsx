
import Colors from '@/constants/Colors';
import { generalStyles } from '@/constants/Styles';
import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import env from './config/envConfig';


const ResetPassword = () =>  {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')


  const submit = async () => {
    try {
      const { data } = await axios.post(
        `${env.API_URL}/password/reset`,
        { email, code, newPassword: pass }
      );
      Alert.alert('Éxito', data.message);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error, inténtalo luego.';
      Alert.alert('Error', msg);
    }
  };

  return (
    <View style={[generalStyles.container, { alignContent: 'center', justifyContent: 'center' }]}>
      <Text style={styles.title}>Restablecer contraseña</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={generalStyles.input}/>
      <TextInput placeholder="Código" value={code} onChangeText={setCode} style={generalStyles.input}/>
      <TextInput placeholder="Nueva contraseña" secureTextEntry value={pass} onChangeText={setPass} style={generalStyles.input}/>
      <TouchableOpacity
        style={[generalStyles.button, {backgroundColor: Colors.royalBlue, marginTop: 20}]}
        onPress={submit}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator />
          : <Text style={generalStyles.textButton}>Restablecer contraseña</Text>
        }
      </TouchableOpacity>
    </View>
  );
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
});

export default ResetPassword
