import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { styles } from '@/styles/style'

interface IngredientInputProps {
    ingredient: Ingredient,
    setIngredient: (ingredient: Ingredient) => void,
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredient, setIngredient }) => {
  return (
    <View style={styles.rowContainer}>
        <TextInput 
            style={styles.textInput} 
            placeholder="Name" 
            value={ingredient.name} 
            onChangeText={(text) => setIngredient({ ...ingredient, name: text })} 
            />

        <TextInput 
            style={styles.textInput} 
            placeholder="Unity of measure" 
            value={ingredient.unityOfMeasure} 
            onChangeText={(text) => setIngredient({ ...ingredient, unityOfMeasure: text })} 
            />
    </View>
  )
}

export default IngredientInput