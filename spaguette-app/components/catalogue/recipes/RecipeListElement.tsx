import React from "react";
import { Recipe } from "@/types/Catalogue";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Pencil } from "lucide-react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

interface RecipesListElementProps {
  recipe: Recipe;
}

const RecipesListElement: React.FC<RecipesListElementProps> = ({ recipe }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.navigate({
          pathname: "/(protected)/catalogue/recipes/[recipeId]",
          params: { recipeId: recipe.id },
        })
      }
    >
      <Card
        size="md"
        variant="filled"
        className="my-2 w-full md:flex-row md:h-48 max-w-sm md:max-w-lg self-center"
      >
        <Box className="min-h-48 md:min-h-0 md:min-w-48 bg-blue-500 rounded-sm"></Box>

        <Box className="flex-row flex-1">
          <Box className="md:px-6 pt-2 md:pt-0 flex-1 md:self-center">
            <Heading size="xl" className="mb-0.5 truncate line-clamp-2">
              {recipe.name}
            </Heading>
            {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
              <Text size="sm" key={index} className="line-clamp-1">
                {ingredient.quantity}{" "}
                {ingredient.ingredient.unityOfMeasure.toLocaleLowerCase()} of{" "}
                {ingredient.ingredient.name}
              </Text>
            ))}
          </Box>

          <Button
            variant="link"
            className="mx-2"
            onPress={() =>
              router.navigate({
                pathname: "/(protected)/catalogue/recipes/[recipeId]/update",
                params: { recipeId: recipe.id },
              })
            }
          >
            <ButtonIcon as={Pencil} />
          </Button>
        </Box>
      </Card>
    </Pressable>
  );
};

export default RecipesListElement;
