import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useStyles } from './RecipeListElementShow.style';
import Button from '@/components/general/Button';

interface RecipeListElementShowProps {
    recipe: Recipe;
    setIsModifying: (state: boolean) => void;
}

const RecipeListElementShow: React.FC<RecipeListElementShowProps> = ({ recipe, setIsModifying }) => {

    const styles = useStyles()

  return (
    <View style={styles.shadowContainer}>
        <View style={styles.container}>
            <View style={styles.image}></View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{recipe.name}</Text>
                {recipe.ingredients.map((ingredient, index) => (
                <Text key={index}>
                    {ingredient.quantity} {ingredient.ingredient.unityOfMeasure} of{" "} {ingredient.ingredient.name}
                </Text>
                ))}
            </View>

            <Button text='Modify' style='tertiary' onPress={() => setIsModifying(true)} />
        </View>
    </View>
  )
}

export default RecipeListElementShow