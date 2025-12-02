import React, { useState } from "react";
import RecipeListElementShow from "./RecipeListElementShow";
import UpdateRecipeInput from "../modify-recipes/UpdateRecipeInput";
import { Recipe } from "@/types/Catalogue";
import { Box } from "@/components/ui/box";

interface RecipesListElementProps {
  recipe: Recipe;
}

const RecipesListElement: React.FC<RecipesListElementProps> = ({ recipe }) => {
  const [isModifying, setIsModifying] = useState<boolean>(false)

  return (
    <Box>
      {isModifying ? 
        <UpdateRecipeInput initialRecipe={recipe} afterSubmit={() => setIsModifying(false)}/>
        :
        <RecipeListElementShow recipe={recipe} setIsModifying={setIsModifying} />
      }
    </Box>
  )
};

export default RecipesListElement;