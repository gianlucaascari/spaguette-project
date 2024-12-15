import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { dataService } from '@/services/data/data-service';

interface AddRecipeIngredientsInputProps {
    ingredients: {ingredient: Ingredient, quantity: number}[];
    setIngredients: React.Dispatch<React.SetStateAction<{ingredient: Ingredient, quantity: number}[]>>;   
}

const AddRecipeIngredientsInput: React.FC<AddRecipeIngredientsInputProps> = ({ ingredients, setIngredients }) => {

    // add and remove ingredients logic
    const [chosenIngredient, setChosenIngredient] = React.useState<Ingredient | null>(null);
    const [chosenQuantity, setChosenQuantity] = React.useState<string>("");
    const [ingredientsList, setIngredientsList] = React.useState<Ingredient[]>([]);

    useEffect(() => {
        dataService.getIngredients().then(setIngredientsList);
    }, []);

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

    // keyboard ux
    const ingredientRefs = React.useRef<(TextInput | null)[]>([]);
    const quantityRefs = React.useRef<(TextInput | null)[]>([]);

    const handleKeyDown = (event: any, index: number, type: 'ingredient' | 'quantity') => {
        const { key } = event.nativeEvent;

        if (key === 'Backspace') {
            onRemoveIngredient(index);
        }

        if (key === 'ArrowUp' && index > 0) {
            if (type === 'ingredient') {
                ingredientRefs.current[index - 1]?.focus();
            } else {
                quantityRefs.current[index - 1]?.focus();
            }
        } else if (key === 'ArrowDown' && index < ingredients.length - 1) {
            if (type === 'ingredient') {
                ingredientRefs.current[index + 1]?.focus();
            } else {
                quantityRefs.current[index + 1]?.focus();
            }
        } else if (key === 'ArrowRight') {
            if (type === 'ingredient') {
                quantityRefs.current[index]?.focus();
            }
        } else if (key === 'ArrowLeft') {
            if (type === 'quantity') {
                ingredientRefs.current[index]?.focus();
            }
        }
    };

return (
    <View>
        {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.container}>
                <TextInput 
                    ref={(ref) => ingredientRefs.current[index] = ref}
                    style={styles.textInput}
                    value={ingredient.ingredient.name}
                    editable={false}
                    onKeyPress={(e) => handleKeyDown(e, index, 'ingredient')}
                    />
                <TextInput
                    ref={(ref) => quantityRefs.current[index] = ref}
                    style={styles.textInput}
                    value={ingredient.quantity.toString()}
                    editable={false}
                    onKeyPress={(e) => handleKeyDown(e, index, 'quantity')}
                    />
                <Pressable style={styles.button} onPress={() => onRemoveIngredient(index)}>
                    <Text>Remove</Text>
                </Pressable>
            </View>
        ))}

        <View style={styles.container}>
            <Dropdown 
                style={styles.textInput}
                data={ingredientsList.filter(ingredient => !ingredients.map(i => i.ingredient.id).includes(ingredient.id))}
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
                onKeyPress={(e) => {
                    if(e.nativeEvent.key === 'Enter') {
                        onAddIngredient();
                    }
                }}
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