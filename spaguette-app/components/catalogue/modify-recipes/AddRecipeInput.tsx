import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import RecipeInput from './RecipeInput'
import { useDataService } from '@/services/data/useDataService'

const AddRecipeInput = () => {

    const emptyRecipe: Recipe = {
        id: '',
        name: '',
        description: '',
        stepsLink: '',
        ingredients: [],
    }

    const [recipe, setRecipe] = useState<Recipe>(emptyRecipe)
    const { addRecipe } = useDataService()

    const onPressAdd = async () => {
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
        try{
            await addRecipe(recipeInput);
        } catch(e:any) {
            alert('AddRecipeInput> Error adding recipe\n' + e?.message);
            return;
        } 
        
        // reset fields
        setRecipe(emptyRecipe)
    }

  return (
    <View style={styles.rowContainer}>
        <RecipeInput recipe={recipe} setRecipe={setRecipe} />

        <Pressable style={styles.button} onPress={onPressAdd} >
            <Text>Add Recipe</Text>
        </Pressable>
    </View>
  )
}

export default AddRecipeInput

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