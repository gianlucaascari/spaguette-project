import { View } from "react-native";
import React, { useRef, useState } from "react";
import PlanElementInput from "./PlanElementInput";
import { useDataService } from "@/services/data/data-service";
import { RecipeQuantity } from "@/types/Plan";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";

const AddPlanElementInput = () => {
  const { addToPlan, getMyList } = useDataService();

  const [planElement, setPlanElement] = useState<RecipeQuantity>({
    recipe: {
      id: "",
      name: "",
      ingredients: [],
    },
    numTimes: 0,
  });

  const selectRef = useRef<View>(null);
  const [isPlanElementValid, setIsPlanElementValid] = useState(true);

  const addPlanElement = () => {
    // check form content
    if (planElement.recipe.id === "" || planElement.numTimes === 0) {
      setIsPlanElementValid(false);
      return;
    }

    // create new plan element input
    const planElementInput = {
      recipeID: planElement.recipe.id,
      numTimes: planElement.numTimes,
    };

    // call data service
    addToPlan(planElementInput).then(() => getMyList(true));

    // reset form
    setPlanElement({
      recipe: { id: "", name: "", ingredients: [] },
      numTimes: 0,
    });

    selectRef.current?.focus();
  };

  return (
    <HStack className="w-full">
      <PlanElementInput
        planElement={planElement}
        setPlanElement={setPlanElement}
        selectRef={selectRef}
        isPlanElementValid={isPlanElementValid}
        setIsPlanElementValid={setIsPlanElementValid}
      />
      <Button onPress={addPlanElement} className="ml-2">
        <ButtonText>Add</ButtonText>
      </Button>
    </HStack>
  );
};

export default AddPlanElementInput;
