import { ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import {
  isCompleteIngredientInput,
  OptionalRecipeInput,
  RecipeInput,
} from "@/types/Catalogue";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import RecipeHeadingInput from "@/components/catalogue/recipes/RecipeHeadingInput";
import IngredientsSectionInput from "@/components/catalogue/recipes/IngredientsSectionInput";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useDataService } from "@/services/data/data-service";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";
import { DataContext } from "@/services/data/DataContext";
import RecipeInputComponent from "@/components/catalogue/recipes/RecipeInputComponent";

const UpdateRecipePage = () => {
  const dataService = useDataService();
  const [loading, setLoading] = useState(false);

  const onSave = async (recipeInput: RecipeInput) => {
    setLoading(true);

    const recipeId = await dataService.addRecipe(recipeInput);

    setLoading(false);

    if (recipeId === undefined) {
      router.navigate("/(protected)/(tabs)/recipe-page");
    } else {
      router.navigate({
        pathname: "/(protected)/catalogue/recipes/[recipeId]",
        params: { recipeId: recipeId as string },
      });
    }
  };

  return (
    <>
      <RecipeInputComponent onSave={onSave}/>

      <Modal isOpen={loading}>
        <ModalBackdrop />
        <ModalContent className="w-24">
          <Spinner size="large" color="gray" />
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateRecipePage;
