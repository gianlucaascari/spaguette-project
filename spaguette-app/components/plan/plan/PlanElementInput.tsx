import React, { useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { DataContext } from "@/services/data/DataContext";
import { useDataService } from "@/services/data/data-service";
import { RecipeQuantity } from "@/types/Plan";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { HStack } from "@/components/ui/hstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "lucide-react-native";
import { TextInput } from "react-native";

interface PlanElementInputProps {
  planElement: RecipeQuantity;
  setPlanElement: (planElement: RecipeQuantity) => void;
  selectRef?: React.RefObject<View>;
  isPlanElementValid: boolean;
  setIsPlanElementValid: (b: boolean) => void;
}

const PlanElementInput: React.FC<PlanElementInputProps> = ({
  planElement,
  setPlanElement,
  selectRef,
  isPlanElementValid,
  setIsPlanElementValid,
}) => {
  const { state } = useContext(DataContext);
  const { getRecipes } = useDataService();

  const [isQuantityValid, setIsQuantityValid] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(
    planElement.numTimes.toString()
  );

  useEffect(() => {
    // if not ignore cache, refetches the old list of recipes if one was just added
    getRecipes(true);
  }, []);

  useEffect(() => {
    setInputQuantity(planElement.numTimes.toString());
  }, [planElement]);

  const handleInsertedQuantity = () => {
    const newQuantity = parseInt(inputQuantity);

    if (isNaN(newQuantity) || newQuantity === 0) {
      setIsQuantityValid(false);
      setPlanElement({ ...planElement, numTimes: 0 });
    } else {
      setIsQuantityValid(true);
      setPlanElement({ ...planElement, numTimes: newQuantity });

      if (planElement.recipe.id !== "") setIsPlanElementValid(true);
    }
  };

  return (
    <FormControl isInvalid={!isPlanElementValid} className="flex-1">
      <HStack className="items-center">
        <Select
          onValueChange={(id) => {
            setPlanElement({
              ...planElement,
              recipe: state.recipes.find((r) => r.id === id)!,
            });
            if (isQuantityValid) setIsPlanElementValid(true)  
          }}
          className="flex-[4] min-w-32 mr-2"
        >
          <SelectTrigger
            ref={selectRef}
            variant="outline"
            size="md"
            className="web:outline-none"
            accessibilityRole="button"
          >
            <SelectInput
              placeholder="Select a recipe"
              value={planElement.recipe.name}
              ref={selectRef as any}
            />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent>
              {state.recipes.map((rec, i) => (
                <SelectItem
                  key={i}
                  label={rec.name}
                  value={rec.id}
                  onFocus={() => console.log("test 2")}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>

        <Input className="min-w-16 max-w-20 flex-[1]">
          <InputField
            value={inputQuantity}
            onChangeText={setInputQuantity}
            onBlur={handleInsertedQuantity}
            onFocus={() => console.log("test")}
          />
        </Input>
      </HStack>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500" />
        <FormControlErrorText className="text-red-500">
          Please select a recipe and insert a valid quantity.
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default PlanElementInput;
