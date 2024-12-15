import { View, Text, TextInput, StyleSheet, Button, Pressable } from 'react-native'
import React, { useState } from 'react'
import AddRecipeIngredientsInput from './AddRecipeIngredientsInput';

const AddRecipeInput = () => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [stepsLink, setStepsLink] = useState<string>('');
    const [ingredients, setIngredients] = useState<{ quantity: number, ingredient: Ingredient }[]>([]);

    const onAddRecipe = () => {
        alert('Add Recipe' + name + description + stepsLink + ingredients);
        // check fields

        // create recipeInput

        // call dataService

        // reset fields

    }

  return (
    <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.textInput} placeholder="Description" value={description} onChangeText={setDescription} multiline/>
        <TextInput style={styles.textInput} placeholder="Steps Link" value={stepsLink} onChangeText={setStepsLink} />

        <AddRecipeIngredientsInput ingredients={ingredients} setIngredients={setIngredients} />

        <Pressable style={styles.button} onPress={onAddRecipe} >
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