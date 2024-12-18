import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useDataService } from '@/services/data/useDataService'
import RecipeInput from './RecipeInput'

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
        const recipeInput = {
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    textInput: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    button: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        backgroundColor: 'orange',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});