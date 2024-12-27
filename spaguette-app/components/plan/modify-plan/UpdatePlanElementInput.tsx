import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/style'
import PlanElementInput from './PlanElementInput'
import { useDataService } from '@/services/data/data-service'

interface UpdatePlanElementInputProps {
    initialElement: RecipeQuantity,
    afterSubmit: () => void,
}

const UpdatePlanElementInput: React.FC<UpdatePlanElementInputProps> = ({ initialElement, afterSubmit }) => {

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
    <View style={styles.rowContainer}>
      <PlanElementInput planElement={planElement} setPlanElement={setPLanElement} />

      <Pressable style={styles.button} onPress={onUpdateElement}>
        <Text>Save</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={onDeleteEelement}>
        <Text>Delete</Text>
      </Pressable>
    </View>
  )
}

export default UpdatePlanElementInput