import { View } from 'react-native'
import React, { useState } from 'react'
import { useDataService } from '@/services/data/data-service'
import Button from '@/components/general/Button'
import { useStyles } from './UpdatePlanElementInput.style'
import PlanElementInput from './PlanElementInput'

interface UpdatePlanElementInputProps {
    initialElement: RecipeQuantity,
    afterSubmit: () => void,
}

const UpdatePlanElementInput: React.FC<UpdatePlanElementInputProps> = ({ initialElement, afterSubmit }) => {

    const styles = useStyles()

    const { updateInPlan, deleteFromPlan, getMyList } = useDataService()
    const [planElement, setPLanElement] = useState(initialElement)

    const onUpdateElement = () => {
        // check input
        if(!planElement.recipe.id || !planElement.numTimes) {
            alert("Please fill all fields");
            return;
        }

        // create planElementInput
        const planElementInput = {
            recipeID: planElement.recipe.id,
            numTimes: planElement.numTimes,
        }

        // call data service
        updateInPlan(initialElement.recipe.id, planElementInput).then(() => getMyList(true));

        // after submit
        afterSubmit()
    }

    const onDeleteEelement = () => {
        // check input
        if(!planElement.recipe.id) {
            alert("Please choose the recipe");
            return;
        }

        // call data service
        deleteFromPlan(initialElement.recipe.id).then(() => getMyList(true));

        // after submit
        afterSubmit()
    }

  return (  
    <View style={styles.container}>
      <PlanElementInput planElement={planElement} setPlanElement={setPLanElement} />
      <View style={styles.buttonContainer}>
        <Button text='Delete' style='secondary' onPress={onDeleteEelement} />
        <Button text='Save' style='primary' onPress={onUpdateElement} />
      </View>
    </View>
  )
}

export default UpdatePlanElementInput