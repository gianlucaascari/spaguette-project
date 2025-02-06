import { useContext } from "react";
import { apiService } from "../api/api-service";
import { DataContext } from "./DataContext";
import { useDataServicePlan } from "./data-service-plan";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Data service to fetch and manipulate data, combining API and (soon) local storage
 * @module services/data/data-service
 * @see module:services/api/api-service
 * @see module:types/Catalogue
 */
export const useDataService = () => {
    const { dispatch } = useContext(DataContext);
    
    return {
        getIngredients: async () => {
            try {
                const ingredients = await apiService.getIngredients();
                dispatch({ type: 'SET_INGREDIENTS', payload: ingredients });
            } catch (e: any) {
                console.error('Error getting ingredients:', e);
                alert('Data Serive > Error getting ingredients\n' + e?.message);
                return;
            }
        },
        addIngredient: async (ingredient: IngredientInput) => {
            try {
                const addedIngredient = await apiService.addIngredient(ingredient);
                dispatch({ type: 'ADD_INGREDIENT', payload: addedIngredient });
            } catch (e: any) {
                console.error('Error adding ingredient:', e);
                alert('Data Serive > Error adding ingredient\n' + e?.message);
                return;
            }
        },
        updateIngredient: async (id: string, ingredient: IngredientInput) => {
            try {
                const updatedIngredient = await apiService.updateIngredient(id, ingredient);
                dispatch({ type: 'UPDATE_INGREDIENT', payload: updatedIngredient });
            } catch (e: any) {
                console.error('Error updating ingredient:', e);
                alert('Data Serive > Error updating ingredient\n' + e?.message);
                return;
            }
        },
        deleteIngredient: async (id: string) => {
            try {
                await apiService.deleteIngredient(id);
                dispatch({ type: 'DELETE_INGREDIENT', payload: id });
            } catch (e: any) {
                console.error('Error deleting ingredient:', e);
                alert('Data Serive > Error deleting ingredient\n' + e?.message);
                return;
            }
        },
        getRecipes: async () => {
            try {
                const recipes = await apiService.getRecipes();
                dispatch({ type: 'SET_RECIPES', payload: recipes });
            } catch (e: any) {
                console.error('Error getting recipes:', e);
                alert('Data Serive > Error getting recipes\n' + e?.message);
                return;
            }
        },
        addRecipe: async (recipe: RecipeInput) => {
            try {
                const addedRecipe = await apiService.addRecipe(recipe);
                dispatch({ type: 'ADD_RECIPE', payload: addedRecipe });
            } catch (e: any) {
                console.error('Error adding recipe:', e);
                alert('Data Serive > Error adding recipe\n' + e?.message);
                return;
            }
        },
        updateRecipe: async (id: string, recipe: RecipeInput) => {
            try {
                const updatedRecipe = await apiService.updateRecipe(id, recipe);
                dispatch({ type: 'UPDATE_RECIPE', payload: updatedRecipe });
            } catch (e: any) {
                console.error('Error updating recipe:', e);
                alert('Data Serive > Error updating recipe\n' + e?.message);
                return;
            }
        },
        deleteRecipe: async (id: string) => {
            try {
                await apiService.deleteRecipe(id);
                dispatch({ type: 'DELETE_RECIPE', payload: id });
            } catch (e: any) {
                console.error('Error deleting recipe:', e);
                alert('Data Serive > Error deleting recipe\n' + e?.message);
                return;
            }
        },
        ... useDataServicePlan(),
        resetState: () => {
            dispatch({ type: 'RESET_STATE' })
        }
    };
};