import { View, Text, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import PlanElementInput from './PlanElementInput';
import { useDataService } from '@/services/data/data-service';
import Button from '@/components/general/Button';
import { useStyles } from '../../../styles/components/plan/modify-plan/AddPlanElementInput.style';
import { RecipeQuantity } from '@/types/application/Plan';

const AddPlanElementInput = () => {

    const styles = useStyles()

    const { addToPlan, getMyList } = useDataService();

    const [planElement, setPlanElement] = useState<RecipeQuantity>({
        recipe: {
            id: "",
            name: "",
            ingredients: [],
        },
        numTimes: 0,
    });

    const addPlanElement = () => {
        // check form content
        if (planElement.recipe.id === "" || planElement.numTimes === 0) {
            Alert.alert('Please fill in all fields');
            return;
        }

        // create new plan element input
        const planElementInput = { recipeID: planElement.recipe.id, numTimes: planElement.numTimes };

        // call data service
        addToPlan(planElementInput).then(() => getMyList(true));

        // reset form
        setPlanElement({ recipe: { id: "", name: "", ingredients: [] }, numTimes: 0 });
    }

  return (
    <View style={styles.container}>
        <PlanElementInput planElement={planElement} setPlanElement={setPlanElement} />
        <Button text='Add' style='primary' onPress={addPlanElement} />
    </View>
  )
}

export default AddPlanElementInput