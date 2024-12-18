import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { styles } from '@/styles/style';

interface RecipeListElementShowProps {
    recipe: Recipe;
    setIsModifying: (state: boolean) => void;
}

const RecipeListElementShow: React.FC<RecipeListElementShowProps> = ({ recipe, setIsModifying }) => {
  return (
    <View style={styles.rowContainer}>
        <View style={styles.container}>
            <Text style={styles.title}>{recipe.name}</Text>
            {recipe.ingredients.map((ingredient, index) => (
            <Text key={index}>
                {ingredient.quantity} {ingredient.ingredient.unityOfMeasure} of{" "} {ingredient.ingredient.name}
            </Text>
            ))}
        </View>
        <Pressable style={styles.button} onPress={() => setIsModifying(true)}>
            <Text>Modify</Text>
        </Pressable>
      </View>
  )
}

export default RecipeListElementShow