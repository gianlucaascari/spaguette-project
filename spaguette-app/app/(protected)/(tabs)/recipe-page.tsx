import { ScrollView, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import { Text, View } from "@/components/Themed";
import { DataContext } from "@/services/data/DataContext";
import { useDataService } from "@/services/data/data-service";
import AddRecipeInput from "@/components/catalogue/modify-recipes/AddRecipeInput";
import RecipesListElement from "@/components/catalogue/show-recipes/RecipeListElement";
import { useStyles } from "../../../styles/app/(tabs)/recipe-page.style";
import { Recipe } from "@/types/Catalogue";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  // utilities
  const styles = useStyles();
  const { state } = useContext(DataContext);
  const { getRecipes } = useDataService();

  const router = useRouter();

  const [isAddingRecipe, setAddingRecipe] = useState(false);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <ScrollView
      className="bg-background-0"
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
    >
      <Box className="p-4 w-screen max-w-2xl self-center">
        {isAddingRecipe ? (
          <AddRecipeInput
            onCancel={() => setAddingRecipe(false)}
            afterSubmit={() => setAddingRecipe(false)}
          />
        ) : (
          <Button
            onPress={() => setAddingRecipe(true)}
          >
            <ButtonText>Add recipe</ButtonText>
          </Button>
        )}

        {state.recipes ? (
          <Box className="justify-center">
            {state.recipes.map((recipe: Recipe, index: number) => (
              <RecipesListElement key={index} recipe={recipe} />
            ))}
          </Box>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </ScrollView>
  );
}
