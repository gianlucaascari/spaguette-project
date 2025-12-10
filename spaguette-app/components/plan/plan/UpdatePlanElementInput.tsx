import React, { useState } from "react";
import { useDataService } from "@/services/data/data-service";
import PlanElementInput from "./PlanElementInput";
import { RecipeQuantity } from "@/types/Plan";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";

interface UpdatePlanElementInputProps {
  initialElement: RecipeQuantity;
  afterSubmit: () => void;
}

const UpdatePlanElementInput: React.FC<UpdatePlanElementInputProps> = ({
  initialElement,
  afterSubmit,
}) => {
  const { updateInPlan, deleteFromPlan, getMyList } = useDataService();
  const [planElement, setPLanElement] = useState(initialElement);
  const [isPlanElementValid, setIsPlanElementValid] = useState(true);

  const onUpdateElement = () => {
    // check input
    if (!planElement.recipe.id || !planElement.numTimes) {
      setIsPlanElementValid(false);
      return;
    }

    // create planElementInput
    const planElementInput = {
      recipeID: planElement.recipe.id,
      numTimes: planElement.numTimes,
    };

    // call data service
    updateInPlan(initialElement.recipe.id, planElementInput).then(() =>
      getMyList(true)
    );

    // after submit
    afterSubmit();
  };

  const onDeleteEelement = () => {
    // check input
    if (!planElement.recipe.id) {
      alert("Please choose the recipe");
      return;
    }

    // call data service
    deleteFromPlan(initialElement.recipe.id).then(() => getMyList(true));

    // after submit
    afterSubmit();
  };

  return (
    <Box className="my-1 md:flex-row">
      <PlanElementInput
        planElement={planElement}
        setPlanElement={setPLanElement}
        isPlanElementValid={isPlanElementValid}
        setIsPlanElementValid={setIsPlanElementValid}
      />

      <HStack className="mt-2 md:mt-0 self-end md:ml-2">
        <Button
          action="negative"
          variant="solid"
          onPress={onDeleteEelement}
          className="mr-2"
        >
          <ButtonText>Remove</ButtonText>
        </Button>

        <Button action="primary" variant="solid" onPress={onUpdateElement}>
          <ButtonText>Save</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default UpdatePlanElementInput;
