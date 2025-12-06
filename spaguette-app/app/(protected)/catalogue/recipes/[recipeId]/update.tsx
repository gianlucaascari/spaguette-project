import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe, RecipeInput } from "@/types/Catalogue";
import { useDataService } from "@/services/data/data-service";
import RecipeInputComponent from "@/components/catalogue/recipes/RecipeInputComponent";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";

const UpdateRecipePage = () => {
  const dataService = useDataService();
  const { recipeId } = useLocalSearchParams();

  const [newRecipe, setNewRecipe] = useState<Recipe | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dataService.getRecipe(recipeId as string).then((recipe) => {
      setNewRecipe(recipe);
    });
  }, [recipeId]);

  const onSave = async (recipeInput: RecipeInput) => {
    setLoading(true);

    await dataService.updateRecipe(recipeId as string, recipeInput);

    setLoading(false);

    router.navigate({
      pathname: "/(protected)/catalogue/recipes/[recipeId]",
      params: { recipeId: recipeId as string },
    });
  };

  return (
    <>
      <RecipeInputComponent
        recipe={
          newRecipe !== undefined
            ? {
                ...newRecipe,
                ingredients: newRecipe.ingredients.map((ing) => ({
                  ingredientID: ing.ingredient?.id,
                  quantity: ing.quantity,
                })),
              }
            : undefined
        }
        onSave={onSave}
      />

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
