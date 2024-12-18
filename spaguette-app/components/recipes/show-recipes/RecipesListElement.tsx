import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import RecipeInput from "../add-recipes/OldRecipeInput";
import RecipeListElementShow from "./RecipeListElementShow";

interface RecipesListElementProps {
  recipe: Recipe;
}

const RecipesListElement: React.FC<RecipesListElementProps> = ({ recipe }) => {
  const [isModifying, setIsModifying] = useState<boolean>(false)

  return (
    <View>
      {isModifying ? 
        <RecipeInput initialRecipe={recipe} mode="update" afterSubmit={() => setIsModifying(false)}/>
        :
        <RecipeListElementShow recipe={recipe} setIsModifying={setIsModifying} />
      }
    </View>
  )
};

export default RecipesListElement;

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