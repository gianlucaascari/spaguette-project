import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '@/styles/const/colors'
import { useStyles } from '../../../styles/components/catalogue/modify-ingredients/IngredientInput.style'
import { Dropdown } from 'react-native-element-dropdown'
import { Ingredient, UnityOfMeasure } from '@/types/application/Catalogue'

interface IngredientInputProps {
    ingredient: Ingredient,
    setIngredient: (ingredient: Ingredient) => void,
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredient, setIngredient }) => {

  const styles = useStyles()

  const unityOfMeasureOptions = Object.entries(UnityOfMeasure).map(([key, value]) => ({
    label: key.toLowerCase(),  // GraphQL uses uppercase values like "GR"
    value: value, // Your lowercase value for frontend use
  }));

  return (
    <View style={styles.container}>
        <TextInput 
            style={styles.textInput} 
            placeholder="Name" 
            placeholderTextColor={COLORS.placeholder}
            value={ingredient.name} 
            onChangeText={(text) => setIngredient({ ...ingredient, name: text })} 
            />

        <Dropdown
          style={styles.textInput}
          data={unityOfMeasureOptions}
          value={ingredient.unityOfMeasure}
          onChange={(value) => setIngredient({ ...ingredient, unityOfMeasure: UnityOfMeasure[value.value]})}
          labelField={'label'}
          valueField={'value'}
          />
    </View>
  )
}

export default IngredientInput