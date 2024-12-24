import { View, Text } from 'react-native'
import React, { useState } from 'react'
import PlanListElementShow from './PlanListElementShow';

interface PlanListElementProps {
    planElement: RecipeQuantity;
}

const PlanListElement: React.FC<PlanListElementProps> = ({ planElement }) => {

    const [isModifying, setIsModifying] = useState(false);

  return (
    <View>
        {isModifying ? (
            <Text>Modifying...</Text>
        ) : (
            <PlanListElementShow planElement={planElement} setIsModifying={setIsModifying} />
        )}
    </View>
  )
}

export default PlanListElement