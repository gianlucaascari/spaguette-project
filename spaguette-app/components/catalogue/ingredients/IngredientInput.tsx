import React from "react";
import { Ingredient, UnityOfMeasure } from "@/types/Catalogue";
import {
  Select,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react-native";
import { Input, InputField } from "@/components/ui/input";
import { Box } from "@/components/ui/box";

interface IngredientInputProps {
  ingredient: Ingredient;
  setIngredient: (ingredient: Ingredient) => void;
}

type UnityOfMeasureKey = keyof typeof UnityOfMeasure;

const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredient,
  setIngredient,
}) => {

  const unityOfMeasureOptions = Object.entries(UnityOfMeasure).map(
    ([key, value]) => ({
      label: key.toLowerCase(), // GraphQL uses uppercase values like "GR"
      value: value, // Your lowercase value for frontend use
    })
  );

  return (
    <Box className="sm:flex-col md:flex-row justify-between">
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="md:w-full my-1 md:my-0"
      >
        <InputField 
          value={ingredient.name} 
          placeholder="Name"
          onChangeText={(text) => setIngredient({ ...ingredient, name: text })}
          />
      </Input>

      <Select
        onValueChange={(value) =>
          setIngredient({
            ...ingredient,
            unityOfMeasure: UnityOfMeasure[value as UnityOfMeasureKey],
          })
        }
        initialLabel={ingredient.unityOfMeasure.toLocaleLowerCase()}
        selectedValue={ingredient.unityOfMeasure}
        className="md:ml-4 md:max-w-20 my-1 md:my-0"
      >
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Unity of Measure" />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          {unityOfMeasureOptions.map((UdM) => (
            <SelectItem key={UdM.label} label={UdM.label} value={UdM.value} />
          ))}
        </SelectPortal>
      </Select>
    </Box>
  );
};

export default IngredientInput;
