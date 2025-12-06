import { ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";

import { DataContext } from "@/services/data/DataContext";
import { useDataService } from "@/services/data/data-service";
import IngredientListElement from "@/components/catalogue/ingredients/IngredientListElement";
import AddIngredientInput from "@/components/catalogue/ingredients/AddIngredientInput";
import { Ingredient } from "@/types/Catalogue";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

export default function TabTwoScreen() {
  const { state } = useContext(DataContext);
  const { getIngredients } = useDataService();

  const [isAddingIngredient, setIsAddingIngredient] = useState(false);

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <ScrollView className="bg-background-0">
      <Box className="p-4 w-screen max-w-2xl self-center">
        {state.ingredients ? (
          state.ingredients.map((ingredient: Ingredient, index: number) => (
            <IngredientListElement key={index} ingredient={ingredient} />
          ))
        ) : (
          <Text>Loading...</Text>
        )}

        {isAddingIngredient ? (
          <AddIngredientInput
            onCancel={() => setIsAddingIngredient(false)}
            afterSubmit={() => setIsAddingIngredient(false)}
          />
        ) : (
          <Button
            onPress={() => setIsAddingIngredient(true)}
            variant="link"
            className="py-1"
          >
            <ButtonIcon as={AddIcon} />
          </Button>
        )}
      </Box>
    </ScrollView>
  );
}
