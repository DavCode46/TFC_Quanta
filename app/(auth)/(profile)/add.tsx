import RadioButton from '@/components/RadioButton'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Add = () => {
  const [amount, setAmount] = useState(0.0)
  const [account, setAccount] = useState('')
  const [accountType, setAccountType] = useState('myAccount')

  const [errorAmount, setErrorAmount] = useState('')
  const [errorAccount, setErrorAccount] = useState('')

  const validateAccount = (account: string): boolean => {
    // Elimina espacios para permitir formatos con separadores
    const normalized = account.replace(/\s/g, '');
    // Regex para IBAN español: "ES" seguido de 22 dígitos (total 24 caracteres)
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


  return (
    <View style={[generalStyles.container]}>
      <Text style={generalStyles.header}>Ingresar dinero</Text>
      <View style={{ marginTop: 20 }}>
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
            Alert.alert('Ingreso exitoso', `Se ha ingresado ${amount}€ a la cuenta`)
            setData()
          }
        }}>
          <Text style={{ color: Colors.white, fontSize: 20, fontWeight: '600' }} >Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Add
