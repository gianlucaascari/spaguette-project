import { ScrollView } from "react-native";
import { useContext, useEffect } from "react";

import { DataContext } from "@/services/data/DataContext";
import { useDataService } from "@/services/data/data-service";
import RecipesListElement from "@/components/catalogue/recipes/RecipeListElement";
import { Recipe } from "@/types/Catalogue";
import { Box } from "@/components/ui/box";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";

export default function TabOneScreen() {
  // utilities
  const { state } = useContext(DataContext);
  const { getRecipes } = useDataService();

  const router = useRouter();

  useEffect(() => {
    getRecipes(true);
  }, []);

  if (!state.recipes) {
    return (
      <Box className="bg-background-0 flex-1 items-center justify-center">
        <Text> loading... </Text>
      </Box>
    );
  }

  return (
    <Box className="bg-background-0">
      <ScrollView className="p-4 w-screen self-center">
        <Box className="justify-center">
          {state.recipes.map((recipe: Recipe, index: number) => (
            <RecipesListElement key={index} recipe={recipe} />
          ))}
        </Box>
      </ScrollView>
      <Fab
        size="md"
        placement="bottom right"
        isHovered={true}
        isDisabled={false}
        isPressed={true}
        onPress={() => router.navigate("/(protected)/catalogue/recipes/create")}
      >
        <FabIcon as={AddIcon} />
        <FabLabel>Add Recipe</FabLabel>
      </Fab>
    </Box>
  );
}
