import { View, Text } from "react-native";
import React from "react";

interface RecipesListElementProps {
  recipe: Recipe;
}

const RecipesListElement: React.FC<RecipesListElementProps> = ({ recipe }) => (
  <View>
    <Text>{recipe.name}</Text>
    {recipe.ingredients.map((ingredient, index) => (
      <Text key={index}>
        {ingredient.quantity} {ingredient.ingredient.unityOfMeasure} of{" "} {ingredient.ingredient.name}
      </Text>
    ))}
  </View>
);

export default RecipesListElement;
