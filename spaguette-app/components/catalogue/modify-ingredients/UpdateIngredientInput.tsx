import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import IngredientInput from './IngredientInput'
import { styles } from '@/styles/style'

interface UpdateIngredientInputProps {
    initialIngredient: Ingredient,
    afterSubmit: () => void,
}

const UpdateIngredientInput: React.FC<UpdateIngredientInputProps> = ({ initialIngredient, afterSubmit }) => {

    const [ingredient, setIngredient] = useState<Ingredient>(initialIngredient)

    const onUpdateIngredientPress = () => {
        // check if the ingredient is empty
        if (ingredient.name === '' || ingredient.unityOfMeasure === '') {
            return
        }

        // call data service
        try {
            alert('UpdateIngredientInput> Update ingredient called with ingredient: ' + JSON.stringify(ingredient))
            //updateIngredient(ingredient)
        } catch (e: any) {
            alert('AddIngredientInput> Error adding ingredient\n' + e?.message)
            return
        }

        // call afterSubmit
        afterSubmit()
    }

    const onDeleteIngredientPress = () => {
        // call data service
        try {
            alert('UpdateIngredientInput> Delete ingredient called with ingredient: ' + JSON.stringify(ingredient))
            //deleteIngredient(ingredient)
        } catch (e: any) {
            alert('AddIngredientInput> Error adding ingredient\n' + e?.message)
            return
        }

        // call afterSubmit
        afterSubmit()
    }

  return (
    <View style={styles.rowContainer}>
        <IngredientInput ingredient={ingredient} setIngredient={setIngredient} />

        <View style={styles.rowContainer}>
            <Pressable style={styles.button} onPress={onUpdateIngredientPress}>
                <Text>Save</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={onDeleteIngredientPress}>
                <Text>Delete</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default UpdateIngredientInput