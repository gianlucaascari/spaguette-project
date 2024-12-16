import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/useDataService';

interface AddRecipeIngredientsInputProps {
    ingredients: {ingredient: Ingredient, quantity: number}[];
    setIngredients: React.Dispatch<React.SetStateAction<{ingredient: Ingredient, quantity: number}[]>>;   
}

const AddRecipeIngredientsInput: React.FC<AddRecipeIngredientsInputProps> = ({ ingredients, setIngredients }) => {

    // add and remove ingredients logic
    const { state } = useContext(DataContext);
    const { getIngredients } = useDataService();

    useEffect(() => {
        getIngredients();
    }, []);

    const [chosenIngredient, setChosenIngredient] = React.useState<Ingredient | null>(null);
    const [chosenQuantity, setChosenQuantity] = React.useState<string>("");

    const onAddIngredient = () => {
        if(chosenIngredient === null) {
            alert('Please choose an ingredient');
            return;
        }

        const quantity = Number.isNaN(parseInt(chosenQuantity)) ? 0 : parseInt(chosenQuantity)
        if(quantity === 0) {
            alert('Please choose a quantity');
            return;
        }

        setIngredients([...ingredients, {ingredient: chosenIngredient, quantity: quantity}]);
        setChosenIngredient(null);
        setChosenQuantity("");
    }

    const onRemoveIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    }

return (
    <View>
        {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.container}>
                <TextInput 
                    style={styles.textInput}
                    value={ingredient.ingredient.name}
                    editable={false}
                    />
                <TextInput
                    style={styles.textInput}
                    value={ingredient.quantity.toString()}
                    editable={false}
                    />
                <Pressable style={styles.button} onPress={() => onRemoveIngredient(index)}>
                    <Text>Remove</Text>
                </Pressable>
            </View>
        ))}

        <View style={styles.container}>
            <Dropdown 
                style={styles.textInput}
                data={state.ingredients.filter(ingredient => !ingredients.map(i => i.ingredient.id).includes(ingredient.id))}
                value={chosenIngredient}
                onChange={(value) => setChosenIngredient(value)}
                labelField="name"
                valueField="id"
                search
                />

            <TextInput
                style={styles.textInput}
                placeholder="Quantity"
                value={chosenQuantity}
                onChangeText={(text) => setChosenQuantity(text)}
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