import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

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

const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
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