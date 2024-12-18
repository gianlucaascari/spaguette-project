import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import IngredientInput from './IngredientInput'
import { styles } from '@/styles/style'

const AddIngredientInput = () => {

    const emptyIngredient = {
        id: '',
        name: '',
        unityOfMeasure: '',
    }

    const [ingredient, setIngredient] = useState<Ingredient>(emptyIngredient)

    const onAddIngredientPress = () => {
        // check if the ingredient is empty
        if (ingredient.name === '' || ingredient.unityOfMeasure === '') {
            return
        }

        // call data service
        alert('AddIngredientInput> Add ingredient with arguments: ' + ingredient.name + ' ' + ingredient.unityOfMeasure)

        // reset fields
        setIngredient(emptyIngredient)
    }

  return (
    <View style={styles.rowContainer}>
        <IngredientInput ingredient={ingredient} setIngredient={setIngredient} />

        <Pressable style={styles.button} onPress={onAddIngredientPress}>
            <Text>Add Ingredient</Text>
        </Pressable>
    </View>
  )
}

export default AddIngredientInput