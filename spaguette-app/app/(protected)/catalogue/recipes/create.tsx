import { ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import {
  isCompleteIngredientInput,
  OptionalRecipeInput,
} from "@/types/Catalogue";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import RecipeHeadingInput from "@/components/catalogue/show-recipes/RecipeHeadingInput";
import IngredientsSectionInput from "@/components/catalogue/show-recipes/IngredientsSectionInput";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useDataService } from "@/services/data/data-service";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";
import { DataContext } from "@/services/data/DataContext";

const UpdateRecipePage = () => {
  const dataService = useDataService();
  const { state } = useContext(DataContext);

  const [newRecipe, setNewRecipe] = useState<OptionalRecipeInput>({
    name: "",
    ingredients: [],
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dataService.getIngredients();
  }, []);

  const fullIngredients = newRecipe.ingredients.map((ing) => ({
    ingredient: state.ingredients.find((i) => i.id === ing.ingredientID),
    quantity: ing.quantity,
  }));

  const onSave = async () => {
    const isNameInvalid = newRecipe?.name.trim() === "";
    const validIngredients = newRecipe?.ingredients.filter(
      isCompleteIngredientInput
    );
    if (
      isNameInvalid ||
      !validIngredients ||
      validIngredients.length !== newRecipe?.ingredients.length
    ) {
      return;
    }

    const recipeInput = { ...newRecipe, ingredients: validIngredients };

    setIsUpdating(true);
    const recipeId = await dataService.addRecipe(recipeInput);
    setIsUpdating(false);

    if (recipeId === undefined) {
      router.navigate("/(protected)/(tabs)/recipe-page");
    } else {
      router.navigate({
        pathname: "/(protected)/catalogue/recipes/[recipeId]",
        params: { recipeId: recipeId as string },
      });
    }
  };

  if (newRecipe == null) {
    return (
      <Box className="bg-background-0 flex-1 items-center justify-center">
        <Text> loading... </Text>
      </Box>
    );
  }

  if (newRecipe == undefined) {
    return (
      <Box className="bg-background-0 flex-1 items-center justify-center">
        <Text> An error occurred while getting the recipe. </Text>
      </Box>
    );
  }

  return (
    <ScrollView className="bg-background-0 pb-16">
      <Box className="w-full bg-blue-500 min-h-48" />

      <Box className="p-4 w-full max-w-2xl self-center">
        <Box className="my-4">
          <RecipeHeadingInput
            name={newRecipe.name}
            setName={(name) => setNewRecipe({ ...newRecipe, name })}
            link={newRecipe.stepsLink}
            setLink={(link) => setNewRecipe({ ...newRecipe, stepsLink: link })}
          />
        </Box>

        <IngredientsSectionInput
          ingredients={fullIngredients}
          setIngredients={(ingredients) =>
            setNewRecipe({
              ...newRecipe,
              ingredients: ingredients.map((ing) => ({
                ingredientID: ing.ingredient?.id,
                quantity: ing.quantity,
              })),
            })
          }
        />
        <Heading className="mb-2">Description</Heading>
        <Textarea className="min-h-56 mb-6">
          <TextareaInput
            value={newRecipe.description}
            placeholder="Enter your description here..."
            onChangeText={(text) =>
              setNewRecipe({ ...newRecipe, description: text })
            }
          />
        </Textarea>

        <Button variant="solid" action="primary" onPress={() => onSave()}>
          <ButtonText>Save</ButtonText>
        </Button>
      </Box>

      <Modal isOpen={isUpdating}>
        <ModalBackdrop />
        <ModalContent className="max-w-24">
          <Spinner size="large" color="gray" />
        </ModalContent>
      </Modal>
    </ScrollView>
  );
};

export default UpdateRecipePage;
