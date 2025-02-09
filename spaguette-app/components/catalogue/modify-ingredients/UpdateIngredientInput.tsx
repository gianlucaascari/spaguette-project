import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import IngredientInput from './IngredientInput'
import { useDataService } from '@/services/data/data-service'
import Button from '@/components/general/Button'
import { useStyles } from '../../../styles/components/catalogue/modify-ingredients/UpdateIngredientInput.style'
import { Ingredient, IngredientInput as IngredientInputType } from '@/types/Catalogue'

interface UpdateIngredientInputProps {
    initialIngredient: Ingredient,
    afterSubmit: () => void,
}

const UpdateIngredientInput: React.FC<UpdateIngredientInputProps> = ({ initialIngredient, afterSubmit }) => {

    const styles = useStyles()

    const [ingredient, setIngredient] = useState<Ingredient>(initialIngredient)
    const { updateIngredient, deleteIngredient } = useDataService()

    const onUpdateIngredientPress = () => {
        // check if the ingredient is empty
        if (ingredient.name === '') {
            alert('please insert a name for the ingredient')
            return
        }

        // create ingredientInput
        const ingredientInput: IngredientInputType = {
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
    <View style={styles.container}>
        <IngredientInput ingredient={ingredient} setIngredient={setIngredient} />

        <View style={styles.buttonContainer}>
            <Button text='Delete' style='secondary' onPress={onDeleteIngredientPress} />
            <Button text='Save' style='primary' onPress={onUpdateIngredientPress} />
        </View>
    </View>
  )
}

export default UpdateIngredientInput