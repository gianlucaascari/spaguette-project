import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import RecipeListElementShow from "./RecipeListElementShow";
import UpdateRecipeInput from "../add-recipes/UpdateRecipeInput";

interface RecipesListElementProps {
  recipe: Recipe;
}

const RecipesListElement: React.FC<RecipesListElementProps> = ({ recipe }) => {
  const [isModifying, setIsModifying] = useState<boolean>(false)

  return (
    <View style={styles.rowContainer}>
      {isModifying ? 
        <UpdateRecipeInput initialRecipe={recipe} afterSubmit={() => setIsModifying(false)}/>
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