import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useDataService } from '@/services/data/data-service'
import RecipeInput from './recipe-input/RecipeInput'
import { styles } from '@/styles/style'

interface UpdateRecipeInputProps {
    initialRecipe: Recipe,
    afterSubmit: () => void,
}

const UpdateRecipeInput: React.FC<UpdateRecipeInputProps> = ({ initialRecipe, afterSubmit }) => {

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
    <View style={styles.rowContainer}>
        <RecipeInput recipe={recipe} setRecipe={setRecipe} />

        <View>
            <Pressable style={styles.button} onPress={onPressUpdate} >
                    <Text>Save</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={onPressDelete} >
                    <Text>Delete</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default UpdateRecipeInput