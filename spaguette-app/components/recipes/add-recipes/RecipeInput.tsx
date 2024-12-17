import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import RecipeIngredientsInput from './RecipeIngredientsInput';
import { useDataService } from '@/services/data/useDataService';

interface RecipeInputProps {
    initialRecipe: Recipe,
    mode: "add" | "update",
    afterSubmit?: () => void,
}

const RecipeInput:React.FC<RecipeInputProps> = ({initialRecipe, mode, afterSubmit}) => {

    const { addRecipe, updateRecipe } = useDataService();

    const [name, setName] = useState<string>(initialRecipe.name);
    const [description, setDescription] = useState<string>(initialRecipe.description || '');
    const [stepsLink, setStepsLink] = useState<string>(initialRecipe.stepsLink || '');
    const [ingredients, setIngredients] = useState<{ quantity: number, ingredient: Ingredient }[]>(initialRecipe.ingredients);

    const onSubmit = async () => {
        // check fields
        // TODO -> what if there is no id for update? is it a possibility?
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
        if(mode == "add"){
            try{
                await addRecipe(recipeInput);
            } catch(e:any) {
                alert('AddRecipeInput> Error adding recipe\n' + e?.message);
                return;
            } 
        }
        else {
            try {
                await updateRecipe(initialRecipe.id, recipeInput)
            }
            catch (e:any) {
                alert('AddRecipeInput> Error updating recipe\n' + e?.message);
                return;
            }
        }

        // after submit
        if(afterSubmit) afterSubmit();
        
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

        <RecipeIngredientsInput ingredients={ingredients} setIngredients={setIngredients} />

        <Pressable style={styles.button} onPress={onSubmit} >
            <Text>Add Recipe</Text>
        </Pressable>
    </View>
  )
}

export default RecipeInput

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