import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  IngredientQuantity,
  isCompleteIngredient,
  OptionalIngredientQuantity,
  OptionalRecipe,
  Recipe,
  RecipeInput,
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

const UpdateRecipePage = () => {
  const { recipeId } = useLocalSearchParams();
  const dataService = useDataService();

  const [newRecipe, setNewRecipe] = useState<OptionalRecipe | undefined | null>(
    null
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dataService.getRecipe(recipeId as string).then((recipe) => {
      setNewRecipe(recipe);
    });
  }, [recipeId]);

  useEffect(() => {
    dataService.getIngredients();
  }, []);

  const onSave = async () => {
    const isNameInvalid = newRecipe?.name.trim() === "";
    const validIngredients =
      newRecipe?.ingredients.filter(isCompleteIngredient);

    if (
      isNameInvalid ||
      !validIngredients ||
      validIngredients.length !== newRecipe?.ingredients.length
    ) {
      return;
    }

    const recipeInput: RecipeInput = {
      name: newRecipe.name,
      description: newRecipe.description,
      stepsLink: newRecipe.stepsLink,
      ingredients: validIngredients.map((i) => ({
        ingredientID: i.ingredient.id,
        quantity: i.quantity,
      })),
    };

    setIsUpdating(true);
    await dataService.updateRecipe(newRecipe.id, recipeInput);
    setIsUpdating(false);
    router.navigate({
      pathname: "/(protected)/catalogue/recipes/[recipeId]",
      params: { recipeId: recipeId as string },
    });
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
        <HStack className="justify-between items-center my-4">
          <RecipeHeadingInput
            name={newRecipe.name}
            setName={(name) => setNewRecipe({ ...newRecipe, name })}
            link={newRecipe.stepsLink}
            setLink={(link) => setNewRecipe({ ...newRecipe, stepsLink: link })}
          />

          <Button variant="solid" action="primary" onPress={() => onSave()}>
            <ButtonText>Save</ButtonText>
          </Button>
        </HStack>

        <IngredientsSectionInput
          ingredients={newRecipe.ingredients}
          setIngredients={(ingredients) =>
            setNewRecipe({ ...newRecipe, ingredients })
          }
        />

        <Heading className="mb-2">Description</Heading>
        <Textarea className="min-h-56">
          <TextareaInput
            value={newRecipe.description}
            placeholder="Enter your description here..."
            onChangeText={(text) =>
              setNewRecipe({ ...newRecipe, description: text })
            }
          />
        </Textarea>
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
