import React, { useContext, useState } from "react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import {
  Ingredient,
  OptionalIngredientQuantity,
} from "@/types/Catalogue";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import {
  AddIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import {
  Select,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { DataContext } from "@/services/data/DataContext";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Trash2 } from "lucide-react-native";

interface IngredientInputProps {
  ingredient: Ingredient | undefined;
  quantity: number | undefined;
  setQuantity: (q: number) => void;
  setIngredient: (i: Ingredient) => void;
  removeElement: () => void;
  selectableIngredients: Ingredient[];
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredient,
  quantity,
  setQuantity,
  setIngredient,
  removeElement,
  selectableIngredients,
}) => {
  const [providedQuantity, setProvidedQuantity] = useState(
    quantity?.toString()
  );
  const [isQuantityInvalid, setIsQuantityInvalid] = useState(false);

  const handleInsertedQuantity = () => {
    if (providedQuantity == undefined) {
      return;
    }

    const newQuantity = parseInt(providedQuantity);

    if (isNaN(newQuantity)) {
      setIsQuantityInvalid(true);
    } else {
      setIsQuantityInvalid(false);
      setQuantity(newQuantity);
    }
  };

  const handleChosenIngredient = (id: string) => {
    console.log(id);
    const selectedIngredient = selectableIngredients.find(
      (ing) => ing.id == id
    );
    setIngredient(selectedIngredient as Ingredient);
  };

  return (
    <HStack className="mb-2 items-center">
      <FormControl
        isInvalid={isQuantityInvalid}
        className="min-w-16 max-w-20 mr-2 flex-[1]"
      >
        <Input>
          <InputField
            value={providedQuantity}
            onChangeText={setProvidedQuantity}
            onBlur={handleInsertedQuantity}
          />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
          <FormControlErrorText className="text-red-500">
            The quantity must be a number.
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Text className="mr-2 w-6">
        {ingredient?.unityOfMeasure.toLowerCase()}
      </Text>

      <Select
        onValueChange={(id) => handleChosenIngredient(id)}
        selectedValue={ingredient?.id}
        className="flex-[4] min-w-32"
      >
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select option" value={ingredient?.name} />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          {selectableIngredients.map((ing) => (
            <SelectItem key={ing.id} label={ing.name} value={ing.id} />
          ))}
        </SelectPortal>
      </Select>

      <Button
        variant="outline"
        className="px-2 ml-3"
        action="negative"
        onPress={removeElement}
      >
        <ButtonIcon as={Trash2} />
      </Button>
    </HStack>
  );
};

interface IngredientSectionProps {
  ingredients: OptionalIngredientQuantity[];
  setIngredients: (ingredients: OptionalIngredientQuantity[]) => void;
}

const IngredientsSectionInput: React.FC<IngredientSectionProps> = ({
  ingredients,
  setIngredients,
}) => {
  const { state } = useContext(DataContext);
  const selectableIngredients = state.ingredients.filter(
    (ingredient) =>
      ingredient != undefined &&
      !ingredients.some((i) => i.ingredient?.id === ingredient.id)
  );

  return (
    <Card variant="filled" className="mb-6">
      <Heading className="mb-2">Ingredients</Heading>

      {ingredients.map(({ ingredient, quantity }, index, ingredients) => {
        const selIngredients = ingredient
          ? [...selectableIngredients, ingredient]
          : selectableIngredients;
        return (
          <IngredientInput
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
            selectableIngredients={selIngredients.sort((a, b) =>
              a.name.localeCompare(b.name)
            )}
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
        }}
      >
        <ButtonIcon as={AddIcon} />
      </Button>
    </Card>
  );
};

export default IngredientsSectionInput;
