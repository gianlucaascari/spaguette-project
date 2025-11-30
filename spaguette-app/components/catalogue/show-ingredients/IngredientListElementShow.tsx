import React from "react";
import { Ingredient } from "@/types/Catalogue";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Pencil } from "lucide-react-native";

interface IngredientListElementShowProps {
  ingredient: Ingredient;
  setIsModifying: (b: boolean) => void;
}

const IngredientListElementShow: React.FC<IngredientListElementShowProps> = ({
  ingredient,
  setIsModifying,
}) => {
  return (
      <HStack className="w-full py-1 px-3 items-center flex-[3]">
        <Text className="flex-[3]">{ingredient.name}</Text>
        <Text className="flex-[1]">
          {ingredient.unityOfMeasure.toLocaleLowerCase()}
        </Text>
        <Button variant="link" onPress={() => setIsModifying(true)}>
          <ButtonIcon className="text-blue-600 mr-2" as={Pencil} />
        </Button>
      </HStack>
  );
};

export default IngredientListElementShow;
