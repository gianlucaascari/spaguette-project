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
        updateInPlan: async (originalID: string, planElement: PlanElementInput) => {
            try {
                let recipes = state.plan.recipes.map((planElement: RecipeQuantity) => { return { recipeID: planElement.recipe.id, numTimes: planElement.numTimes } });
                const index = recipes.findIndex((recipe) => recipe.recipeID === originalID);
                recipes[index] = { recipeID: planElement.recipeID, numTimes: planElement.numTimes };
                const newPlan = { recipes: recipes };

                const updatedPlan = await apiService.updatePlan(newPlan);
                dispatch({ type: 'SET_PLAN', payload: updatedPlan });
            } catch (e: any) {
                console.error('Error updating in plan:', e);
                alert('Data Serive > Error updating in plan\n' + e?.message);
                return;
            }
        },
        deleteFromPlan: async (recipeID: string) => {
            try {
                let recipes = state.plan.recipes.map((planElement: RecipeQuantity) => { return { recipeID: planElement.recipe.id, numTimes: planElement.numTimes } });
                const index = recipes.findIndex((recipe) => recipe.recipeID === recipeID);
                recipes.splice(index, 1);
                const newPlan = { recipes: recipes };

                const updatedPlan = await apiService.updatePlan(newPlan);
                dispatch({ type: 'SET_PLAN', payload: updatedPlan });
            } catch (e: any) {
                console.error('Error deleting from plan:', e);
                alert('Data Serive > Error deleting from plan\n' + e?.message);
                return;
            }
        },
        getMyList: async (ignoreCache: boolean = true) => {
            try {
                const list = await apiService.getMyList(ignoreCache);
                dispatch({ type: 'SET_LIST', payload: list });
            } catch (e: any) {
                console.error('Error getting list:', e);
                alert('Data Serive > Error getting list\n' + e?.message);
                return;
            }
        },
        updateListItem: async (listItem: ListItemInput) => {
            try {
                let items = state.list.items.map((listItem: ListItem) => { return { ingredientID: listItem.ingredient.id, quantity: listItem.quantity, taken: listItem.taken } });
                const index = items.findIndex((item) => item.ingredientID === listItem.ingredientID);
                items[index] = { ingredientID: listItem.ingredientID, quantity: listItem.quantity, taken: listItem.taken };
                const newList = { items: items };

                const updatedList = await apiService.updateList(newList);
                dispatch({ type: 'SET_LIST', payload: updatedList });
            } catch (e: any) {
                console.error('Error updating list item:', e);
                alert('Data Serive > Error updating list item\n' + e?.message);
                return;
            }
        }
    }
}