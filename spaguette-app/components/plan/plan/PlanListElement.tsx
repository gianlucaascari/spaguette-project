
import React, { useState } from "react";
import PlanListElementShow from "./PlanListElementShow";
import UpdatePlanElementInput from "./UpdatePlanElementInput";
import { RecipeQuantity } from "@/types/Plan";
import { Divider } from "@/components/ui/divider";
import { Box } from "@/components/ui/box";

interface PlanListElementProps {
  planElement: RecipeQuantity;
}

const PlanListElement: React.FC<PlanListElementProps> = ({ planElement }) => {

  const [isModifying, setIsModifying] = useState(false);

  return (
    <Box>
      <Divider />
      {isModifying ? (
        <UpdatePlanElementInput
          initialElement={planElement}
          afterSubmit={() => setIsModifying(false)}
        />
      ) : (
        <PlanListElementShow
          planElement={planElement}
          setIsModifying={setIsModifying}
        />
      )}
    </Box>
  );
};

export default PlanListElement;
