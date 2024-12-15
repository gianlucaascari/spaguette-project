import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import AddRecipeIngredientsInput from './AddRecipeIngredientsInput';
import { dataService } from '@/services/data/data-service';

const AddRecipeInput = () => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [stepsLink, setStepsLink] = useState<string>('');
    const [ingredients, setIngredients] = useState<{ quantity: number, ingredient: Ingredient }[]>([]);

    const onAddRecipe = async () => {
        alert('Add Recipe' + name + description + stepsLink + ingredients);
        // check fields
        if(name === '' || ingredients.length === 0) {
            alert('Please insert at least a name and an ingredient');
            return;
        }

        // create recipeInput
        const recipeInput = {
            name: name,
            description: description,
            stepsLink: stepsLink,
            ingredients: ingredients.map(i => ({ ingredientID: i.ingredient.id, quantity: i.quantity })),
        }

        // call dataService
        try{
            await dataService.addRecipe(recipeInput);
        } catch(e:any) {
            alert('AddRecipeInput> Error adding recipe\n' + e?.message);
            return;
        } 
        
        // reset fields
        setName('');
        setDescription('');
        setStepsLink('');
        setIngredients([]);
    }

  return (
    <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.textInput} placeholder="Description" value={description} onChangeText={setDescription} />
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