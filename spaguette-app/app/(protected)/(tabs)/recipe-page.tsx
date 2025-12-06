import { ScrollView } from "react-native";
import { useContext, useEffect } from "react";

import { DataContext } from "@/services/data/DataContext";
import { useDataService } from "@/services/data/data-service";
import RecipesListElement from "@/components/catalogue/recipes/RecipeListElement";
import { useStyles } from "../../../styles/app/(tabs)/recipe-page.style";
import { Recipe } from "@/types/Catalogue";
import { Box } from "@/components/ui/box";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";

export default function TabOneScreen() {
  // utilities
  const styles = useStyles();
  const { state } = useContext(DataContext);
  const { getRecipes } = useDataService();

  const router = useRouter();

  useEffect(() => {
    getRecipes(true);
  }, []);

  return (
    <Box className="bg-background-0">
      <ScrollView className="p-4 w-screen self-center">
        {state.recipes ? (
          <Box className="justify-center">
            {state.recipes.map((recipe: Recipe, index: number) => (
              <RecipesListElement key={index} recipe={recipe} />
            ))}
          </Box>
        ) : (
          <Text>Loading...</Text>
        )}
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
