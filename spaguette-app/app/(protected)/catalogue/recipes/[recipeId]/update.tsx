import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe, RecipeInput } from "@/types/Catalogue";
import { useDataService } from "@/services/data/data-service";
import RecipeInputComponent from "@/components/catalogue/recipes/RecipeInputComponent";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";
import { Icon } from "@/components/ui/icon";
import { CloseIcon } from "@/components/ui/icon/index.web";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

const UpdateRecipePage = () => {
  const dataService = useDataService();
  const { recipeId } = useLocalSearchParams();

  const [newRecipe, setNewRecipe] = useState<Recipe | undefined>();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const onDelete = async () => {
    setLoading(true);

    await dataService.deleteRecipe(recipeId as string);

    setLoading(false);

    router.navigate("/(protected)/(tabs)/recipe-page");
  };

  const onCancel = () => {
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
                ...(({ id, ...rest }) => rest)(newRecipe),
                ingredients: newRecipe.ingredients.map((ing) => ({
                  ingredientID: ing.ingredient?.id,
                  quantity: ing.quantity,
                })),
              }
            : undefined
        }
        onSave={onSave}
        onCancel={onCancel}
        onDelete={() => setShowDeleteModal(true)}
      />

      <Modal isOpen={loading}>
        <ModalBackdrop />
        <ModalContent className="w-24">
          <Spinner size="large" color="gray" />
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text className="text-2xl">Deleting Recipe</Text>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to permanently delete this recipe?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              className="mr-3"
              onPress={() => {
                setShowDeleteModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              action="negative"
              onPress={() => {
                setShowDeleteModal(false);
                onDelete();
              }}
            >
              <ButtonText>Delete</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateRecipePage;
