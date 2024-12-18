import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import IngredientInput from './IngredientInput'
import { styles } from '@/styles/style'
import { useDataService } from '@/services/data/useDataService'

interface UpdateIngredientInputProps {
    initialIngredient: Ingredient,
    afterSubmit: () => void,
}

const UpdateIngredientInput: React.FC<UpdateIngredientInputProps> = ({ initialIngredient, afterSubmit }) => {

    const [ingredient, setIngredient] = useState<Ingredient>(initialIngredient)
    const { updateIngredient, deleteIngredient } = useDataService()

    const onUpdateIngredientPress = () => {
        // check if the ingredient is empty
        if (ingredient.name === '' || ingredient.unityOfMeasure === '') {
            return
        }

        // create ingredientInput
        const ingredientInput: IngredientInput = {
            name: ingredient.name,
            unityOfMeasure: ingredient.unityOfMeasure,
        }

        // call data service
        try {
            updateIngredient(ingredient.id, ingredientInput)
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
            deleteIngredient(ingredient.id)
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