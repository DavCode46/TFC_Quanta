import env from '@/app/config/envConfig'
import { useAuth } from '@/app/context/AuthContext'
import RadioButton from '@/components/RadioButton'
import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import axios from 'axios'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Withdraw = () => {
  const [amount, setAmount] = useState(0.0)

  const [errorAmount, setErrorAmount] = useState('')

  const { accountContext,triggerReload, user } = useAuth()


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


  const handleWithdrawMoney = async () => {
    try{
      const res = await axios.post(`${env.API_URL}/transactions/withdraw`, {
        amount: amount,
        account_number: accountContext.account.account_number
      },
    {
      withCredentials: true,
      headers: { Authorization: `Bearer: ${user.token}` }
    }
    )
    if(res.status === 200) {
         Alert.alert(res.data.message, `Has retirado ${res.data.transaction.amount} €`)
         setData()
         triggerReload()
         router.push('/(auth)/(tabs)/Home')
       }
       }catch(error: any) {
        Alert.alert('Error al retirar dinero', error.response.data.error)
       }
  }



  return (
    <View style={[generalStyles.container]}>
      <Text style={generalStyles.header}>Retirar dinero</Text>
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
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={[generalStyles.button, { backgroundColor: Colors.royalBlue, marginBottom: 10 }]} onPress={() => {
          if (validateUserData()) {
            handleWithdrawMoney()
          }
        }}>
          <Text style={{ color: Colors.white, fontSize: 20, fontWeight: '600' }} >Retirar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Withdraw
