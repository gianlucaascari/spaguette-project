import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useStyles } from './sign-in.style'
import Button from '@/components/general/Button'
import { COLORS } from '@/styles/colors'
import { useRouter } from 'expo-router'

const SignInPage = () => {

  const styles = useStyles()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder='email'
            placeholderTextColor={COLORS.placeholder}
            />

          <TextInput 
            style={styles.textInput} 
            value={password}
            onChangeText={setPassword}
            placeholder='password'
            placeholderTextColor={COLORS.placeholder}
            secureTextEntry
            />
        </View>

        <Button text='Sign In' style='primary' onPress={() => alert('sign in')} />
        <Button text="Don 't have an account yet? Sign Up" style='tertiary' onPress={() => router.replace('./sign-up')} />
      </View>
    </View>
  )
}

export default SignInPage