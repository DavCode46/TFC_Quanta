import RadioButton from '@/components/RadioButton'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Withdraw = () => {
  const [amount, setAmount] = useState(0.0)

  const [errorAmount, setErrorAmount] = useState('')


  const validateUserData = () => {
    let isValid = true

    if (amount <= 0) {
      setErrorAmount('La cantidad debe ser mayor a 0')
      isValid = false
    }

    return isValid
  }



  const handleAmountChange = (amount: number) => {
    setAmount(amount)
    setErrorAmount(amount > 0 ? '' : 'La cantidad debe ser mayor a 0')
  }

  const setData = () => {
    setAmount(0)
    setErrorAmount('')
  }


  return (
    <View style={[generalStyles.container]}>
      <Text style={generalStyles.header}>Retirar dinero</Text>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={generalStyles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={amount === 0 ? '' : amount.toString()}
          onChangeText={text => handleAmountChange(parseFloat(text) || 0)}
        />
        {errorAmount && amount <= 0 ? <Text style={generalStyles.error}>{errorAmount}</Text> : null}
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={[generalStyles.pillButton, { backgroundColor: Colors.royalBlue, marginBottom: 10 }]} onPress={() => {
          if (validateUserData()) {
            Alert.alert('Retiro exitoso', `Se ha retirado ${amount}€ de su cuenta`)
            setData()
          }
        }}>
          <Text style={{ color: Colors.white, fontSize: 20, fontWeight: '600' }} >Retirar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Withdraw
