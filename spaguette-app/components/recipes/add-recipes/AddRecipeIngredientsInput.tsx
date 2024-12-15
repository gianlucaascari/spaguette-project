import { View, Text, TextInput, StyleSheet, Button, Touchable, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { dataService } from '@/services/data/data-service';

interface AddRecipeIngredientsInputProps {
    ingredients: {ingredient: Ingredient, quantity: number}[];
    setIngredients: React.Dispatch<React.SetStateAction<{ingredient: Ingredient, quantity: number}[]>>;   
}

const AddRecipeIngredientsInput: React.FC<AddRecipeIngredientsInputProps> = ({ ingredients, setIngredients }) => {

    const [chosenIngredient, setChosenIngredient] = React.useState<Ingredient | null>(null);
    const [chosenQuantity, setChosenQuantity] = React.useState<number>(0);
    const [ingredientsList, setIngredientsList] = React.useState<Ingredient[]>([]);

    useEffect(() => {
        dataService.getIngredients().then(setIngredientsList);
    }, []);

    const onAddIngredient = () => {
        if(chosenIngredient === null) {
            alert('Please choose an ingredient');
            return;
        }

        if(chosenQuantity === 0) {
            alert('Please choose a quantity');
            return;
        }

        setIngredients([...ingredients, {ingredient: chosenIngredient, quantity: chosenQuantity}]);
        setChosenIngredient(null);
        setChosenQuantity(0);
    }

    const onRemoveIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    }

  return (
    <View>
        {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.container}>
                <Text key={index} style={styles.textInput}>{ingredient.ingredient.name}</Text>
                <Text key={index} style={styles.textInput}>{ingredient.quantity}</Text>
                <Pressable style={styles.button} onPress={() => onRemoveIngredient(index)}>
                    <Text>Remove</Text>
                </Pressable>
            </View>
        ))}

        <View style={styles.container}>

            <Dropdown 
                data={ingredientsList.filter(ingredient => !ingredients.map(i => i.ingredient.id).includes(ingredient.id))}
                value={chosenIngredient}
                onChange={(value) => setChosenIngredient(value)}
                labelField="name"
                valueField="id"
                search
                style={styles.textInput}
                />

            <TextInput 
                style={styles.textInput}
                placeholder="Quantity"
                value={chosenQuantity.toString()}
                onChangeText={(text) => setChosenQuantity(Number.isNaN(parseInt(text)) ? 0 : parseInt(text))}
                />
                
            <Pressable style={styles.button} onPress={onAddIngredient}>
                <Text>Add Ingredient</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default AddRecipeIngredientsInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    textInput: {
        width: 150,
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