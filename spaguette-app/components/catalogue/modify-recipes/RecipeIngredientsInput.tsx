import { View, Text, TextInput, StyleSheet, Pressable, useWindowDimensions } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/data-service';
import Button from '@/components/general/Button';
import { useStyles } from './RecipeIngredientsInput.style';
import { COLORS } from '@/styles/colors';

interface RecipeIngredientsInputProps {
    ingredients: {ingredient: Ingredient, quantity: number}[];
    setIngredients: (ingredients: {ingredient: Ingredient, quantity: number}[]) => void;   
}

const RecipeIngredientsInput: React.FC<RecipeIngredientsInputProps> = ({ ingredients, setIngredients }) => {

    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const styles = useStyles();

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
                    style={styles.ingredientInput}
                    value={ingredient.ingredient.name}
                    editable={false}
                    />
                <View style={styles.quantityContainer}>
                    <TextInput
                        style={styles.quantityInput}
                        value={ingredient.quantity.toString()}
                        editable={false}
                        />
                    <Text style={styles.text}>
                        {ingredient.ingredient.unityOfMeasure}
                    </Text>
                </View>
                <Button text={"Remove"} style='tertiary' onButtonPress={() => onRemoveIngredient(index)} />
            </View>
        ))}

        <View style={styles.containerInput}>
            <Dropdown 
                style={styles.ingredientInput}
                data={state.ingredients.filter(ingredient => !ingredients.map(i => i.ingredient.id).includes(ingredient.id))}
                value={chosenIngredient}
                onChange={(value) => setChosenIngredient(value)}
                labelField="name"
                valueField="id"
                search
                />

            <View style={styles.quantityContainer}>
                <TextInput
                    style={styles.quantityInput}
                    placeholder="XX"
                    textAlign='right'
                    placeholderTextColor={COLORS.placeholder}
                    value={chosenQuantity}
                    onChangeText={(text) => setChosenQuantity(text)}
                    />
                
                <Text style={styles.text}>
                    {chosenIngredient == null ? "  " : chosenIngredient.unityOfMeasure}
                </Text>
            </View>
                
            <Button text={isMobile ? "Add" : "Add Ingredient"} style='secondary' onButtonPress={onAddIngredient} />
        </View>
    </View>
  )
}

export default RecipeIngredientsInput