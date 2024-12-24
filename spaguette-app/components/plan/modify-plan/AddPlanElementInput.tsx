import { View, Text, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import PlanElementInput from './PlanElementInput';
import { styles } from '@/styles/style';

const AddPlanElementInput = () => {

    const [planElement, setPlanElement] = useState<RecipeQuantity>({
        recipe: {
            id: "",
            name: "",
            ingredients: [],
        },
        numTimes: 0,
    });

    const addPlanElement = () => {
        alert('Adding plan element: ' + planElement.recipe.name + ' ' + planElement.numTimes);
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