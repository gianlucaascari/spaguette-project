import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '@/styles/const/colors'
import { useStyles } from '../../../styles/components/catalogue/modify-ingredients/IngredientInput.style'

interface IngredientInputProps {
    ingredient: Ingredient,
    setIngredient: (ingredient: Ingredient) => void,
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredient, setIngredient }) => {

  const styles = useStyles()

  return (
    <View style={styles.container}>
        <TextInput 
            style={styles.textInput} 
            placeholder="Name" 
            placeholderTextColor={COLORS.placeholder}
            value={ingredient.name} 
            onChangeText={(text) => setIngredient({ ...ingredient, name: text })} 
            />

        <TextInput 
            style={styles.textInput} 
            placeholder="Unity of measure" 
            placeholderTextColor={COLORS.placeholder}
            value={ingredient.unityOfMeasure} 
            onChangeText={(text) => setIngredient({ ...ingredient, unityOfMeasure: text })} 
            />
    </View>
  )
}

export default IngredientInput