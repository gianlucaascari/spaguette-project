import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface RecipesListElementProps {
  recipe: Recipe;
}

const RecipesListElement: React.FC<RecipesListElementProps> = ({ recipe }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{recipe.name}</Text>
    {recipe.ingredients.map((ingredient, index) => (
      <Text key={index}>
        {ingredient.quantity} {ingredient.ingredient.unityOfMeasure} of{" "} {ingredient.ingredient.name}
      </Text>
    ))}
  </View>
);

export default RecipesListElement;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});