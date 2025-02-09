import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useStyles } from '../../styles/app/(auth)/sign-in.style'
import Button from '@/components/general/Button'
import { COLORS } from '@/styles/const/colors'
import { useRouter } from 'expo-router'
import { useAuthService } from '@/services/auth/auth-service'


const SignInPage = () => {
  // utilities
  const styles = useStyles()
  const router = useRouter()
  const authService = useAuthService()

  // sign in data
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // method to perform on sign in
  const onSignIn = () => {
    authService.signIn({email, password})
  }

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

        <Button text='Sign In' style='primary' onPress={onSignIn} />
        <Button text="Don 't have an account yet? Sign Up" style='tertiary' onPress={() => router.replace('./sign-up')} />
      </View>
    </View>
  )
}

export default SignInPage