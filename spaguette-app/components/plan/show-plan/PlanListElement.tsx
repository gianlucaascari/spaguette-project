import { View, Text } from 'react-native'
import React, { useState } from 'react'
import PlanListElementShow from './PlanListElementShow';
import UpdatePlanElementInput from '../modify-plan/UpdatePlanElementInput';

interface PlanListElementProps {
    planElement: RecipeQuantity;
}

const PlanListElement: React.FC<PlanListElementProps> = ({ planElement }) => {

    const [isModifying, setIsModifying] = useState(false);

  return (
    <View>
        {isModifying ? (
            <UpdatePlanElementInput initialElement={planElement} afterSubmit={() => setIsModifying(false)}/>
        ) : (
            <PlanListElementShow planElement={planElement} setIsModifying={setIsModifying} />
        )}
    </View>
  )
}

export default PlanListElement