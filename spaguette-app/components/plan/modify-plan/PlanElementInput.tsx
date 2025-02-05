import { View, Text, TextInput } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { DataContext } from '@/services/data/DataContext';
import { useDataService } from '@/services/data/data-service';
import { COLORS } from '@/styles/colors';
import { useStyles } from './PlanElementInput.style';

interface PlanElementInputProps {
    planElement: RecipeQuantity;
    setPlanElement: (planElement: RecipeQuantity) => void;
}

const PlanElementInput: React.FC<PlanElementInputProps> = ({ planElement, setPlanElement }) => {

    const styles = useStyles()

    const { state } = useContext(DataContext);
    const { getRecipes } = useDataService();

    useEffect(() => {
        getRecipes();
    }, []);

  return (
    <View style={styles.container}>
        <Dropdown
            style={styles.recipeSelector}
            data={state.recipes}
            value={planElement.recipe}
            onChange={(recipe: Recipe) => setPlanElement({ ...planElement, recipe: recipe })}
            labelField='name'
            valueField='id'
            search
        />

        <TextInput
            style={styles.quantityInput}
            placeholder='num. of times' 
            placeholderTextColor={COLORS.placeholder}
            keyboardType='numeric'
            value={planElement.numTimes.toString()}
            onChangeText={(text) => isNaN(parseInt(text)) ? setPlanElement({ ...planElement, numTimes: 0 }) : setPlanElement({ ...planElement, numTimes: parseInt(text) })}
        />
    </View>
  )
}

export default PlanElementInput