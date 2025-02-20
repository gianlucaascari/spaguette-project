import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import RecipeListElementShow from "./RecipeListElementShow";
import UpdateRecipeInput from "../modify-recipes/UpdateRecipeInput";
import { Recipe } from "@/types/application/Catalogue";

interface RecipesListElementProps {
  recipe: Recipe;
}

const RecipesListElement: React.FC<RecipesListElementProps> = ({ recipe }) => {
  const [isModifying, setIsModifying] = useState<boolean>(false)

  return (
    <View>
      {isModifying ? 
        <UpdateRecipeInput initialRecipe={recipe} afterSubmit={() => setIsModifying(false)}/>
        :
        <RecipeListElementShow recipe={recipe} setIsModifying={setIsModifying} />
      }
    </View>
  )
};

export default RecipesListElement;