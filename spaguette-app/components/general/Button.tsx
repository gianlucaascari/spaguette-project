import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styles } from './styles'

interface ButtonProps {
    text: String,
    onButtonPress: () => void,
}

const Button: React.FC<ButtonProps> = ({ text, onButtonPress }) => {
  return (
    <Pressable style={styles.button} onPress={onButtonPress} >
        <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

export default Button