import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styles } from './Button.style'

interface ButtonProps {
    text: String,
    style: 'primary' | 'secondary' | 'tertiary',
    onButtonPress: () => void,
}

const Button: React.FC<ButtonProps> = ({ text, style, onButtonPress }) => {
  return (
    <Pressable 
      style={style == 'primary' ? styles.primaryButton : 
            (style == 'secondary' ? styles.secondaryButton : styles.tertiaryButton)} 
      onPress={onButtonPress} >

        <Text style={style == 'tertiary' ? styles.tertiaryText : styles.primarytext}>
          {text}
        </Text>

    </Pressable>
  )
}

export default Button