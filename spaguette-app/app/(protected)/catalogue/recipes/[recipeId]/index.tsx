import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "@/types/Catalogue";
import { apiService } from "@/services/api/api-service";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pencil } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import RecipeHeading from "@/components/catalogue/show-recipes/RecipeHeading";
import IngredientsSection from "@/components/catalogue/show-recipes/IngredientsSection";
import { useDataService } from "@/services/data/data-service";

const RecipePage = () => {
  const { recipeId } = useLocalSearchParams();

  const dataService = useDataService();

  const [recipe, setRecipe] = useState<Recipe | undefined | null>(null);

  useEffect(() => {
    dataService.getRecipe(recipeId as string).then((recipe) => {
      setRecipe(recipe);
    });
  }, [recipeId]);

  if (recipe == null) {
    return (
      <Box className="bg-background-0 flex-1 items-center justify-center">
        <Text> loading... </Text>
      </Box>
    );
  }

  if (recipe == undefined) {
    return (
      <Box className="bg-background-0 flex-1 items-center justify-center">
        <Text> An error occurred while getting the recipe. </Text>
      </Box>
    );
  }

  return (
    <ScrollView className="bg-background-0">
      <Box className="w-full bg-blue-500 min-h-48" />

      <Box className="p-4 w-full max-w-2xl self-center">
        <HStack className="justify-between items-center my-4">
          <RecipeHeading recipe={recipe} />

          <Button
            variant="link"
            onPress={() =>
              router.navigate({
                pathname: "/(protected)/catalogue/recipes/[recipeId]/update",
                params: { recipeId: recipeId as string },
              })
            }
          >
            <ButtonIcon size="xl" as={Pencil} className="mx -4" />
          </Button>
        </HStack>

        <IngredientsSection recipe={recipe} />

        <Heading>Description</Heading>
        <Text>{recipe.description}</Text>
      </Box>
    </ScrollView>
  );
};

export default RecipePage;
