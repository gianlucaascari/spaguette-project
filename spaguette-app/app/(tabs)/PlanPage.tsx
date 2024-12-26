import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { styles } from '@/styles/style'
import { useDataService } from '@/services/data/data-service';
import { DataContext } from '@/services/data/DataContext';
import PlanListElement from '@/components/plan/show-plan/PlanListElement';
import AddPlanElementInput from '@/components/plan/modify-plan/AddPlanElementInput';
import ListItem from '@/components/plan/show-list/ListItem';

const PlanPage = () => {

    const { state } = useContext(DataContext);
    const { getMyPlan, getMyList } = useDataService();

    useEffect(() => {
        getMyPlan();
        getMyList();
    }, []);

  return (
    <View style={styles.rowContainer}>
        <View style={styles.container}>

            <AddPlanElementInput />
            {state.plan ? 
            (
                state.plan.recipes.map((planElement: RecipeQuantity, index: number) => (
                    <PlanListElement key={index} planElement={planElement} />
                ))
            )
            : 
            (
                <Text>Loading...</Text>
            )}  
        </View>

        <View style={styles.container}>
            {state.list ? 
            (
                state.list.items.map((item: ListItem, index: number) => (
                    <ListItem key={index} item={item} />
                ))
            )
            :
            (
                <Text>Loading...</Text>
            )}
        </View>
    </View>
  )
}

export default PlanPage