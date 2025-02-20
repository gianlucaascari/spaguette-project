import { useContext } from "react";
import { DataContext } from "./DataContext";
import { apiService } from "../api/api-service";
import { ListInput, ListItem, ListItemInput, PlanElementInput, PlanInput, RecipeQuantity } from "@/types/application/Plan";

/**
 * Custom hook for managing data related to the plan.
 * 
 * @returns {Object} Methods to get, add, update, and delete elements from the plan.
 */
export const useDataServicePlan = () => {
    const { state, dispatch } = useContext(DataContext);

    return {

        /**
         * Gets the plan of the user and update the context state
         * @returns {Promise<void>}
         */
        getMyPlan: async () => {
            try {
                const plan = await apiService.getMyPlan();
                dispatch({ type: 'SET_PLAN', payload: plan });
            } catch (e: any) {
                console.error('Error getting plan:', e);
                alert('Data Service > Error getting plan\n' + e?.message);
                return;
            }
        },

        /**
         * Adds a new recipe to the plan of the user and update the context state
         * @param {PlanElementInput} planElement The recipe to add
         * @returns {Promise<void>}
         */
        addToPlan: async (planElement: PlanElementInput) => {
            try {
                let recipes = state.plan.recipes.map((planElement: RecipeQuantity) => { return { recipeID: planElement.recipe.id, numTimes: planElement.numTimes } });
                recipes.push({ recipeID: planElement.recipeID, numTimes: planElement.numTimes });
                const newPlan = { recipes: recipes };

                const updatedPlan = await apiService.updatePlan(newPlan);
                dispatch({ type: 'SET_PLAN', payload: updatedPlan });
            } catch (e: any) {
                console.error('Error adding to plan:', e);
                alert('Data Service > Error adding to plan\n' + e?.message);
                return;
            }
        },

        /**
         * Updates a recipe in the plan of the user and update the context state
         * @param {string} originalID The ID of the recipe to update
         * @param {PlanElementInput} planElement The updated recipe
         * @returns {Promise<void>}
         */
        updateInPlan: async (originalID: string, planElement: PlanElementInput) => {
            try {
                let recipes: PlanElementInput[] = state.plan.recipes.map((planElement: RecipeQuantity) => { return { recipeID: planElement.recipe.id, numTimes: planElement.numTimes } });
                const index = recipes.findIndex((recipe) => recipe.recipeID === originalID);
                recipes[index] = { recipeID: planElement.recipeID, numTimes: planElement.numTimes };
                const newPlan: PlanInput = { recipes: recipes };

                const updatedPlan = await apiService.updatePlan(newPlan);
                dispatch({ type: 'SET_PLAN', payload: updatedPlan });
            } catch (e: any) {
                console.error('Error updating in plan:', e);
                alert('Data Service > Error updating in plan\n' + e?.message);
                return;
            }
        },

        /**
         * Deletes a recipe from the plan of the user and update the context state
         * @param {string} recipeID The ID of the recipe to delete
         * @returns {Promise<void>}
         */
        deleteFromPlan: async (recipeID: string) => {
            try {
                let recipes: PlanElementInput[] = state.plan.recipes.map((planElement: RecipeQuantity) => { return { recipeID: planElement.recipe.id, numTimes: planElement.numTimes } });
                const index = recipes.findIndex((recipe) => recipe.recipeID === recipeID);
                if (index > -1) {
                    recipes.splice(index, 1);
                    const newPlan: PlanInput = { recipes: recipes };

                    const updatedPlan = await apiService.updatePlan(newPlan);
                    dispatch({ type: 'SET_PLAN', payload: updatedPlan });
                } else {
                    console.error('Recipe ID not found:', recipeID);
                    alert('Data Service > Recipe ID not found');
                }
            } catch (e: any) {
                console.error('Error deleting from plan:', e);
                alert('Data Service > Error deleting from plan\n' + e?.message);
                return;
            }
        },

        /**
         * Gets the user's shopping list, optionally ignoring the cached data and updates the context state
         * @param ignoreCache - If true, ignores cached data.
         * @returns {Promise<void>}
         */
        getMyList: async (ignoreCache: boolean = false) => {
            try {
                const list = await apiService.getMyList(ignoreCache);
                dispatch({ type: 'SET_LIST', payload: list });
            } catch (e: any) {
                console.error('Error getting list:', e);
                alert('Data Service > Error getting list\n' + e?.message);
                return;
            }
        },

        /**
         * Updates the user's shopping list and updates the context state
         * @param list The updated list
         * @returns {Promise<void>}
         */
        updateListItem: async (listItem: ListItemInput) => {
            try {
                let items: ListItemInput[] = state.list.items.map((listItem: ListItem) => { return { ingredientID: listItem.ingredient.id, quantity: listItem.quantity, taken: listItem.taken } });
                const index = items.findIndex((item) => item.ingredientID === listItem.ingredientID);
                items[index] = { ingredientID: listItem.ingredientID, quantity: listItem.quantity, taken: listItem.taken };
                const newList: ListInput = { items: items };

                const updatedList = await apiService.updateList(newList);
                dispatch({ type: 'SET_LIST', payload: updatedList });
            } catch (e: any) {
                console.error('Error updating list item:', e);
                alert('Data Service > Error updating list item\n' + e?.message);
                return;
            }
        }
    }
}