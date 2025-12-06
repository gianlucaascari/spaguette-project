import { ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  isCompleteIngredientInput,
  OptionalRecipeInput,
  RecipeInput,
} from "@/types/Catalogue";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import RecipeHeadingInput from "@/components/catalogue/recipes/RecipeHeadingInput";
import IngredientsSectionInput from "@/components/catalogue/recipes/IngredientsSectionInput";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useDataService } from "@/services/data/data-service";
import { DataContext } from "@/services/data/DataContext";
import { HStack } from "@/components/ui/hstack";

interface RecipeInputProps {
  recipe?: RecipeInput;
  onSave: (i: RecipeInput) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const RecipeInputComponent: React.FC<RecipeInputProps> = ({
  recipe,
  onSave,
  onCancel,
  onDelete,
}) => {
  const dataService = useDataService();
  const { state } = useContext(DataContext);

  useEffect(() => {
    dataService.getIngredients();
  }, []);

  const [newRecipe, setNewRecipe] = useState<OptionalRecipeInput>(
    recipe ?? {
      name: "",
      ingredients: [],
    }
  );

  useEffect(() => {
    if (recipe) {
      setNewRecipe(recipe);
      setAreIngredientsValid(recipe.ingredients.map(isCompleteIngredientInput));
    }
  }, [recipe]);

  // TODO: remove
  const fullIngredients = newRecipe.ingredients.map((ing) => ({
    ingredient: state.ingredients.find((i) => i.id === ing.ingredientID),
    quantity: ing.quantity,
  }));

  // moved here instead of in components to allow check when save is pressed
  const [isNameValid, setIsNameValid] = useState(true);
  const [isIngredientsValid, setIsIngredientsValid] = useState(true);
  const [areIngredientsValid, setAreIngredientsValid] = useState<boolean[]>(
    newRecipe.ingredients.map(isCompleteIngredientInput)
  );

  const checkInput = (): boolean => {
    let result = true;

    if (newRecipe.name.trim() === "") {
      setIsNameValid(false);
      result = false;
    }

    if (newRecipe.ingredients.length === 0) {
      setIsIngredientsValid(false);
      result = false;
    }

    if (newRecipe.ingredients.some((ing) => !isCompleteIngredientInput(ing))) {
      setAreIngredientsValid(
        newRecipe.ingredients.map(isCompleteIngredientInput)
      );
      result = false;
    }

    return result;
  };

  const onPressSave = async () => {
    const isInputValid = checkInput();
    if (!isInputValid) return;

    // step for ts, it doesn't change anything, check is above
    const recipeInput = {
      ...newRecipe,
      ingredients: newRecipe?.ingredients.filter(isCompleteIngredientInput),
    };

    onSave(recipeInput);
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
        {onDelete && (
          <Button
            variant="solid"
            action="negative"
            className="self-end"
            onPress={onDelete}
          >
            <ButtonText>Delete</ButtonText>
          </Button>
        )}

        <Box className="my-4">
          <RecipeHeadingInput
            name={newRecipe.name}
            setName={(name) => setNewRecipe({ ...newRecipe, name })}
            link={newRecipe.stepsLink}
            setLink={(link) => setNewRecipe({ ...newRecipe, stepsLink: link })}
            isNameValid={isNameValid}
            setIsNameValid={setIsNameValid}
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
          isIngredientsValid={isIngredientsValid}
          setIsIngredientsValid={setIsIngredientsValid}
          areIngredientsValid={areIngredientsValid}
          setAreIngredientsValid={setAreIngredientsValid}
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

        <HStack>
          <Button variant="outline" action="secondary" onPress={onCancel} className="mr-3 flex-1">
            <ButtonText>Cancel</ButtonText>
          </Button>

          <Button variant="solid" action="primary" onPress={onPressSave} className="flex-1">
            <ButtonText>Save</ButtonText>
          </Button>
        </HStack>
      </Box>
    </ScrollView>
  );
};

export default RecipeInputComponent;
