import { View, Text } from 'react-native'
import React, { useState } from 'react'
import PlanListElementShow from '../plan-list-element-show/PlanListElementShow';
import UpdatePlanElementInput from '../../modify-plan/update-plan-element/UpdatePlanElementInput';
import { useStyles } from './styles';

interface PlanListElementProps {
    planElement: RecipeQuantity;
}

const PlanListElement: React.FC<PlanListElementProps> = ({ planElement }) => {

    const styles = useStyles()

    const [isModifying, setIsModifying] = useState(false);

  return (
    <View style={styles.container}>
        {isModifying ? (
            <UpdatePlanElementInput initialElement={planElement} afterSubmit={() => setIsModifying(false)}/>
        ) : (
            <PlanListElementShow planElement={planElement} setIsModifying={setIsModifying} />
        )}
    </View>
  )
}

export default PlanListElement