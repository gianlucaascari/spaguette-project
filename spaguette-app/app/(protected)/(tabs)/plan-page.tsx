import { ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { useDataService } from "@/services/data/data-service";
import { DataContext } from "@/services/data/DataContext";
import PlanListElement from "@/components/plan/plan/PlanListElement";
import AddPlanElementInput from "@/components/plan/plan/AddPlanElementInput";
import { RecipeQuantity } from "@/types/Plan";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { List } from "lucide-react-native";
import { router } from "expo-router";

const PlanPage = () => {
  // utilities
  const { state } = useContext(DataContext);
  const { getMyPlan, getMyList } = useDataService();

  useEffect(() => {
    getMyPlan();
    getMyList();
  }, []);

  return (
    <Box className="bg-background-0 items-center h-full">
      <ScrollView className="p-4 w-screen max-w-2xl self-center">
        <AddPlanElementInput />
        <Box className="mt-4">
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
      </ScrollView>

      <Fab
        placement="bottom right"
        onPress={() => router.navigate("/(protected)/plan/list")}
      >
        <FabIcon as={List} className="ml-1" />
        <FabLabel>See List</FabLabel>
      </Fab>
    </Box>
  );
};

export default PlanPage;
