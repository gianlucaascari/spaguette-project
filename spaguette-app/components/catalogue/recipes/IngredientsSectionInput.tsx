import React, { useContext, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { OptionalIngredientQuantity } from "@/types/Catalogue";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import {
  AddIcon,
  AlertCircleIcon,
} from "@/components/ui/icon";
import { DataContext } from "@/services/data/DataContext";
import { Button, ButtonIcon } from "@/components/ui/button";
import IngredientQuantityInput from "./IngredientQuantityInput";
import { TextInput } from "react-native";

interface IngredientSectionProps {
  ingredients: OptionalIngredientQuantity[];
  setIngredients: (ingredients: OptionalIngredientQuantity[]) => void;
  isIngredientsValid: boolean;
  setIsIngredientsValid: (b: boolean) => void;
  areIngredientsValid: boolean[];
  setAreIngredientsValid: (b: boolean[]) => void;
}

const IngredientsSectionInput: React.FC<IngredientSectionProps> = ({
  ingredients,
  setIngredients,
  isIngredientsValid,
  setIsIngredientsValid,
  areIngredientsValid,
  setAreIngredientsValid,
}) => {
  const { state } = useContext(DataContext);
  const selectableIngredients = state.ingredients.filter(
    (ingredient) =>
      ingredient != undefined &&
      !ingredients.some((i) => i.ingredient?.id === ingredient.id)
  );

  const lastIngredientInputRef = useRef<TextInput>(null)
  const prevIngredientsLength = useRef(ingredients.length);
  useEffect(() => {
  if (ingredients.length > prevIngredientsLength.current) {
    lastIngredientInputRef.current?.focus();
  }
  prevIngredientsLength.current = ingredients.length;
}, [ingredients.length]);

  return (
    <FormControl isInvalid={!isIngredientsValid} className="mb-6">
      <Card variant="filled">
        <Heading className="mb-2">Ingredients</Heading>

        {ingredients.map(({ ingredient, quantity }, index, ingredients) => {
          const selIngredients = ingredient
            ? [...selectableIngredients, ingredient]
            : selectableIngredients;
          return (
            <IngredientQuantityInput
              ingredient={ingredient}
              quantity={quantity}
              setQuantity={(newQuantity) => {
                setIngredients(
                  ingredients.map((item, i) =>
                    i === index ? { ...item, quantity: newQuantity } : item
                  )
                );
              }}
              setIngredient={(newIngredient) => {
                setIngredients(
                  ingredients.map((item, i) =>
                    i === index ? { ...item, ingredient: newIngredient } : item
                  )
                );
              }}
              removeElement={() => {
                setIngredients(ingredients.filter((item, i) => i !== index));
              }}
              isIngredientValid={areIngredientsValid[index]}
              setIsIngredientValid={(b) =>
                setAreIngredientsValid(
                  areIngredientsValid.map((v, i) => (i === index ? b : v))
                )
              }
              selectableIngredients={selIngredients.sort((a, b) =>
                a.name.localeCompare(b.name)
              )}
              quantityRef={index === (ingredients.length - 1) ? lastIngredientInputRef : undefined}
            />
          );
        })}

        <Button
          variant="outline"
          className="border-gray-500"
          onPress={() => {
            setIngredients([
              ...ingredients,
              { ingredient: undefined, quantity: undefined },
            ]);
            setIsIngredientsValid(true);
            setAreIngredientsValid([...areIngredientsValid, true]);
          }}
        >
          <ButtonIcon as={AddIcon} />
        </Button>
      </Card>

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
        <FormControlErrorText className="text-red-500">
          You need at least one ingredient to have a recipe.
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default IngredientsSectionInput;
