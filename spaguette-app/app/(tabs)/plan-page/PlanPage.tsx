import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useDataService } from '@/services/data/data-service';
import { DataContext } from '@/services/data/DataContext';
import PlanListElement from '@/components/plan/show-plan/plan-list-element/PlanListElement';
import AddPlanElementInput from '@/components/plan/modify-plan/add-plan-element-input/AddPlanElementInput';
import { useStyles } from './styles';
import ListItem from '@/components/plan/show-list/list-item/ListItem';


const PlanPage = () => {

    const styles = useStyles()

    const { state } = useContext(DataContext);
    const { getMyPlan, getMyList } = useDataService();

    useEffect(() => {
        getMyPlan();
        getMyList();
    }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContentStyling}>
        <View style={styles.planningContainer}>

            <AddPlanElementInput />

            <View style={styles.planContainer}></View>
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

        <View style={styles.listContainer}>
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
    </ScrollView>
  )
}

export default PlanPage