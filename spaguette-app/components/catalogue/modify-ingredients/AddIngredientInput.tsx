import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import IngredientInput from './IngredientInput'
import { useDataService } from '@/services/data/data-service'
import { useStyles } from './AddIngredientInput.style'
import Button from '@/components/general/Button'

interface AddIngredientInputProps {
    onCancel: () => void,
    afterSubmit: () => void,
}

const AddIngredientInput: React.FC<AddIngredientInputProps> = ({onCancel, afterSubmit}) => {

    const styles = useStyles()

    const emptyIngredient = {
        id: '',
        name: '',
        unityOfMeasure: '',
    }

    const [ingredient, setIngredient] = useState<Ingredient>(emptyIngredient)
    const { addIngredient } = useDataService()

    const onAddIngredientPress = () => {
        // check if the ingredient is empty
        if (ingredient.name === '' || ingredient.unityOfMeasure === '') {
            return
        }

        // call data service
        try {
            addIngredient(ingredient)
        } catch (e: any) {
            alert('AddIngredientInput> Error adding ingredient\n' + e?.message)
            return
        }

        // reset fields
        setIngredient(emptyIngredient)

        // after submit
        afterSubmit()
    }

  return (
    <View style={styles.container}>
        <IngredientInput ingredient={ingredient} setIngredient={setIngredient} />

        <View style={styles.buttonContainer}>
            <Button text='Cancel' style='tertiary' onPress={onCancel} />
            <Button text='Add Ingredient' style='primary' onPress={onAddIngredientPress} />
        </View>
    </View>
  )
}

export default AddIngredientInput