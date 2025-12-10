import { ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { useDataService } from "@/services/data/data-service";
import { DataContext } from "@/services/data/DataContext";
import PlanListElement from "@/components/plan/plan/PlanListElement";
import AddPlanElementInput from "@/components/plan/plan/AddPlanElementInput";
import { useStyles } from "../../../styles/app/(tabs)/plan-page.style";
import ListItem from "@/components/plan/show-list/ListItem";
import { ListItem as ListItemType, RecipeQuantity } from "@/types/Plan";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useMediaQuery } from "react-responsive";

const PlanPage = () => {
  // utilities
  const styles = useStyles();
  const { state } = useContext(DataContext);
  const { getMyPlan, getMyList } = useDataService();

  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    getMyPlan();
    getMyList();
  }, []);

  return (
    <ScrollView className="bg-background-0 items-center">
      <Box className="p-4 w-screen max-w-2xl self-center">
        <Box>
          <AddPlanElementInput />

          <Box style={styles.planContainer}></Box>
          {state.plan ? (
            state.plan.recipes.map(
              (planElement: RecipeQuantity, index: number) => (
                <PlanListElement key={index} planElement={planElement} />
              )
            )
          ) : (
            <Text>Loading...</Text>
          )}
        </Box>
      </Box>
    </ScrollView>
    // <ScrollView className='bg-background-0' style={styles.container} contentContainerStyle={styles.scrollViewContentStyling}>

    //     <Box style={styles.listContainer}>
    //         {state.list ?
    //         (
    //             state.list.items.map((item: ListItemType, index: number) => (
    //                 <ListItem key={index} item={item} />
    //             ))
    //         )
    //         :
    //         (
    //             <Text>Loading...</Text>
    //         )}
    //     </Box>
    // </ScrollView>
  );
};

export default PlanPage;
