import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { styles } from '@/styles/style'
import { useDataService } from '@/services/data/data-service';
import { DataContext } from '@/services/data/DataContext';
import PlanListElement from '@/components/plan/show-plan/PlanListElement';

const PlanPage = () => {

    const { state } = useContext(DataContext);
    const { getMyPlan } = useDataService();

    useEffect(() => {
        getMyPlan();
    }, []);

  return (
    <View style={styles.container}>
      {state.plan ? (
        state.plan.recipes.map((planElement: RecipeQuantity, index: number) => (
          <PlanListElement key={index} planElement={planElement} />
        )))
        : (
          <Text>Loading...</Text>
        )}
    </View>
  )
}

export default PlanPage