import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useStyles } from './sign-up.style'
import Button from '@/components/general/Button'
import { COLORS } from '@/styles/colors'
import { useRouter } from 'expo-router'

const SignUpPage = () => {

  const styles = useStyles()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignUp = () => {
    // check if a name has been given
    if(name == '') {
      alert('Please insert a name')
      return
    }

    // check if email is valid
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      alert("Please insert a valid email")
      return
    }

    // check validity of passoword
    if(password.length < 4) {
      alert("Please insert a password at least 4 characters long")
      return
    }

    alert("name: " + name + "\nemail: " + email + "\npassword: " + password)
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='name'
            placeholderTextColor={COLORS.placeholder}
            />

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

        <Button text='Sign In' style='primary' onPress={onSignUp} />
        <Button text="Already have an account? Sign In" style='tertiary' onPress={() => router.replace('./sign-in')} />
      </View>
    </View>
  )
}

export default SignUpPage