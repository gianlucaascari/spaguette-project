import { View, Text, Pressable, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import PlanElementInput from './PlanElementInput';
import { styles } from '@/styles/style';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/data-service';

const AddPlanElementInput = () => {

    const { state } = useContext(DataContext);
    const { addToPlan } = useDataService();

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
        addToPlan(planElementInput);

        // reset form
        setPlanElement({ recipe: { id: "", name: "", ingredients: [] }, numTimes: 0 });
    }

  return (
    <View style={styles.rowContainer}>
        <PlanElementInput planElement={planElement} setPlanElement={setPlanElement} />

        <Pressable style={styles.button} onPress={addPlanElement}>
            <Text>Add</Text>
        </Pressable>
    </View>
  )
}

export default AddPlanElementInput