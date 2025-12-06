import React, { useState } from "react";
import { Ingredient } from "@/types/Catalogue";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { AlertCircleIcon, ChevronDownIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import {
  Select,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Trash2 } from "lucide-react-native";

interface IngredientQuantityInputProps {
  ingredient: Ingredient | undefined;
  quantity: number | undefined;
  setQuantity: (q: number | undefined) => void;
  setIngredient: (i: Ingredient) => void;
  removeElement: () => void;
  isIngredientValid: boolean;
  setIsIngredientValid: (b: boolean) => void;
  selectableIngredients: Ingredient[];
}

const IngredientQuantityInput: React.FC<IngredientQuantityInputProps> = ({
  ingredient,
  quantity,
  setQuantity,
  setIngredient,
  removeElement,
  isIngredientValid,
  setIsIngredientValid,
  selectableIngredients,
}) => {
  const [quantityInput, setQuantityInput] = useState(quantity?.toString());
  const [isQuantityValid, setIsQuantityValid] = useState(true);

  const handleInsertedQuantity = () => {
    if (quantityInput == undefined) {
      return;
    }

    const newQuantity = parseInt(quantityInput);

    if (isNaN(newQuantity)) {
      setIsQuantityValid(false);
      setQuantity(undefined);
    } else {
      setIsQuantityValid(true);
      setQuantity(newQuantity);

      // done with if to have only the remove effect and not the adding, improving UX
      if (ingredient !== undefined) setIsIngredientValid(true);
    }
  };

  const handleChosenIngredient = (id: string) => {
    const selectedIngredient = selectableIngredients.find(
      (ing) => ing.id == id
    );
    setIngredient(selectedIngredient as Ingredient);

    // done with if to have only the remove effect and not the adding, improving UX
    if (isQuantityValid) setIsIngredientValid(true);
  };

  return (
    <FormControl isInvalid={!isIngredientValid} className="mb-2">
      <HStack className="w-full items-center">
        <Input className="min-w-16 max-w-20 mr-2 flex-[1]">
          <InputField
            value={quantityInput}
            onChangeText={setQuantityInput}
            onBlur={handleInsertedQuantity}
          />
        </Input>

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

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
        <FormControlErrorText className="text-red-500">
          Every line must contain an ingredient and a valid quantity.
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default IngredientQuantityInput;
