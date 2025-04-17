import { env } from '@/app/config/envConfig'
import { useAuth } from '@/app/context/AuthContext'
import RadioButton from '@/components/RadioButton'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import axios from 'axios'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Add = () => {
  const [amount, setAmount] = useState(0.0)
  const [account, setAccount] = useState('')
  const [accountType, setAccountType] = useState('myAccount')

  const [errorAmount, setErrorAmount] = useState('')
  const [errorAccount, setErrorAccount] = useState('')
  const { triggerReload, accountContext, user } = useAuth()

  const validateAccount = (account: string): boolean => {
    const normalized = account.replace(/\s/g, '');
    const regex = /^ES\d{22}$/;
    return regex.test(normalized);
  };

  const validateUserData = () => {
    let isValid = true

    if (amount <= 0) {
      setErrorAmount('La cantidad debe ser mayor a 0')
      isValid = false
    }

    if (accountType === 'otherAccount' && !validateAccount(account)) {
      setErrorAccount('Número de cuenta no válido')
      isValid = false
    }

    return isValid
  }

  const handleAccountChange = (account: string) => {
    setAccount(account)
    setErrorAccount(validateAccount(account) ? '' : 'Número de cuenta no válido')
  }

  const handleAmountChange = (amount: number) => {
    setAmount(amount)
    setErrorAmount(amount > 0 ? '' : 'La cantidad debe ser mayor a 0')
  }

  const setData = () => {
    setAmount(0)
    setAccount('')
    setErrorAccount('')
    setErrorAmount('')
  }

  const handleAddMoney = async () => {
    try{
      const res = await axios.post(`${env.API_URL}/transactions/add`, {
        amount: amount,
        account_number: accountType === 'myAccount' ? accountContext.account.account_number : account
      },
    {
      withCredentials: true,
      headers: { Authorization: `Bearer: ${user.token}` }
    }
    )
     if(res.status === 200) {
          Alert.alert(res.data.message, `Has ingresado ${res.data.transaction.amount} €`)
          setData()
          triggerReload()
          router.push('/(auth)/(tabs)/home')
        }
        }catch(error: any) {
         Alert.alert('Error al realizar el ingreso', error.response.data.error)
      }
  }


  return (
    <View style={[generalStyles.container]}>
      <Text style={generalStyles.header}>Ingresar dinero</Text>
      <View style={{ marginTop: 20 }}>
          <Text>Ingresa la cantidad:</Text>
        <TextInput
          style={generalStyles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={amount === 0 ? '' : amount.toString()}
          onChangeText={text => handleAmountChange(parseFloat(text) || 0)}
        />
        {errorAmount && amount <= 0 ? <Text style={generalStyles.error}>{errorAmount}</Text> : null}
        <Text style={generalStyles.header}>Selecciona la cuenta</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <RadioButton selected={accountType === 'myAccount'} onPress={() => setAccountType('myAccount')}>Mi cuenta</RadioButton>
          <RadioButton selected={accountType === 'otherAccount'} onPress={() => setAccountType('otherAccount')}>Otra cuenta</RadioButton>
        </View>

        {accountType === 'otherAccount' && (
          <View style={generalStyles.inputContainer}>
            <Text>Ingresa el número de cuenta:</Text>
            <TextInput
              style={generalStyles.input}
              placeholder="Cuenta destino"
              keyboardType="default"
              value={account}
              onChangeText={handleAccountChange}
            />
            {errorAccount ? <Text style={generalStyles.error}>{errorAccount}</Text> : null}
          </View>
        )}
        <TouchableOpacity style={[generalStyles.pillButton, { backgroundColor: Colors.royalBlue, marginBottom: 10 }]} onPress={() => {
          if (validateUserData()) {
            handleAddMoney();
          }
        }}>
          <Text style={{ color: Colors.white, fontSize: 20, fontWeight: '600' }} >Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Add
