import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useDataService } from '@/services/data/data-service'
import RecipeInput from '../recipe-input/RecipeInput'
import Button from '@/components/general/Button'
import { useStyles } from './styles'

interface UpdateRecipeInputProps {
    initialRecipe: Recipe,
    afterSubmit: () => void,
}

const UpdateRecipeInput: React.FC<UpdateRecipeInputProps> = ({ initialRecipe, afterSubmit }) => {

    const styles = useStyles()

    const [recipe, setRecipe] = useState<Recipe>(initialRecipe)
    const { updateRecipe, deleteRecipe } = useDataService()

    const onPressUpdate = async () => {
        // check fields
        if(recipe.name === '' || recipe.ingredients.length === 0) {
            alert('Please insert at least a name and an ingredient');
            return;
        }

        // create recipeInput
        const recipeInput: RecipeInput = {
            name: recipe.name,
            description: recipe.description,
            stepsLink: recipe.stepsLink,
            ingredients: recipe.ingredients.map(i => ({ ingredientID: i.ingredient.id, quantity: i.quantity })),
        }

        // call dataService
        try {
            await updateRecipe(initialRecipe.id, recipeInput)
        }
        catch (e:any) {
            alert('UpdateRecipeInput> Error updating recipe\n' + e?.message);
            return;
        }

        // after submit
        if(afterSubmit) afterSubmit();
    }

    const onPressDelete = async () => {
        // call dataService
        try {
            await deleteRecipe(initialRecipe.id)
        }
        catch (e:any) {
            alert('UpdateRecipeInput> Error deleting recipe\n' + e?.message);
            return;
        }
        
        // after submit
        if(afterSubmit) afterSubmit();
    }

  return (
    <View style={styles.container}>
        <RecipeInput recipe={recipe} setRecipe={setRecipe} />

        <View style={styles.buttonsContainer}>
            <Button text='Delete' style='primary' onButtonPress={onPressDelete} />
            <Button text='Save' style='primary' onButtonPress={onPressUpdate} />
        </View>
    </View>
  )
}

export default UpdateRecipeInput