import { useContext } from "react";
import { DataContext } from "./DataContext";
import { apiService } from "../api/api-service";

export const dataServicePlan = () => {
    const { state, dispatch } = useContext(DataContext);

    return {
        getMyPlan: async () => {
            try {
                const plan = await apiService.getMyPlan();
                dispatch({ type: 'SET_PLAN', payload: plan });
            } catch (e: any) {
                console.error('Error getting plan:', e);
                alert('Data Serive > Error getting plan\n' + e?.message);
                return;
            }
        },
        addToPlan: async (planElement: PlanElementInput) => {
            try {
                let recipes = state.plan.recipes.map((planElement: RecipeQuantity) => { return { recipeID: planElement.recipe.id, numTimes: planElement.numTimes } });
                recipes.push({ recipeID: planElement.recipeID, numTimes: planElement.numTimes });
                const newPlan = { recipes: recipes };

                const updatedPlan = await apiService.updatePlan(newPlan);
                dispatch({ type: 'SET_PLAN', payload: updatedPlan });
            } catch (e: any) {
                console.error('Error adding to plan:', e);
                alert('Data Serive > Error adding to plan\n' + e?.message);
                return;
            }
        },
        updatePlan: async (plan: PlanInput) => {
            try {
                const updatedPlan = await apiService.updatePlan(plan);
                dispatch({ type: 'SET_PLAN', payload: updatedPlan });
            } catch (e: any) {
                console.error('Error updating plan:', e);
                alert('Data Serive > Error updating plan\n' + e?.message);
                return;
            }
        }
    }
}