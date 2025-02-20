import { useContext } from "react"
import { DataContext } from "./DataContext"
import { apiService } from "../api/api-service"
import { IngredientInput, RecipeInput } from "@/types/application/Catalogue"
import { localStorageService } from "../local-storage/local-storage-service"

/**
 * Custom hook for managing data related to ingredients and recipes.
 * 
 * @returns {Object} Methods to get, add, update, and delete ingredients and recipes.
 */
export const useDataServiceCatalogue = () => {
    const { dispatch } = useContext(DataContext)

    return {

        /**
         * Gets all ingredients of the user and update the context state
         * @param {boolean} ignoreCache Whether to ignore the cache and fetch the data from the server
         * @returns {Promise<void>}
         */
        getIngredients: async (ignoreCache: boolean = false) => {
            try {
                const ingredients = await apiService.getIngredients(ignoreCache);

                await Promise.all(ingredients.map(async (ingredient) => {
                    const existingIngredient = await localStorageService.getIngredient(ingredient.id);
                    if (!existingIngredient) {
                        await localStorageService.addIngredient(ingredient);
                    }
                }));

                dispatch({ type: 'SET_INGREDIENTS', payload: ingredients });
            } catch (e: any) {
                alert('Data Service > Error getting ingredients\n' + e?.message);
                return;
            }
        },

        /**
         * Adds a new ingredient to the user's list and update the context state
         * @param {IngredientInput} ingredient The ingredient to add
         * @returns {Promise<void>}
         */
        addIngredient: async (ingredient: IngredientInput) => {
            try {
                const addedIngredient = await apiService.addIngredient(ingredient);

                await localStorageService.addIngredient(addedIngredient);

                dispatch({ type: 'ADD_INGREDIENT', payload: addedIngredient });
            } catch (e: any) {
                console.error('Error adding ingredient:', e);
                alert('Data Service > Error adding ingredient\n' + e?.message);
                return;
            }
        },
        
        /**
         * Updates an ingredient of the user and update the context state
         * @param {string} id The ID of the ingredient to update
         * @param {IngredientInput} ingredient The updated ingredient
         * @returns {Promise<void>}
         */
        updateIngredient: async (id: string, ingredient: IngredientInput) => {
            try {
                const updatedIngredient = await apiService.updateIngredient(id, ingredient);

                await localStorageService.updateIngredient(updatedIngredient);

                dispatch({ type: 'UPDATE_INGREDIENT', payload: updatedIngredient });
            } catch (e: any) {
                console.error('Error updating ingredient:', e);
                alert('Data Service > Error updating ingredient\n' + e?.message);
                return;
            }
        },

        /**
         * Deletes an ingredient of the user and update the context state
         * @param {string} id The ID of the ingredient to delete
         * @returns {Promise<void>}
         */
        deleteIngredient: async (id: string) => {
            try {
                await apiService.deleteIngredient(id);

                await localStorageService.deleteIngredient(id);

                dispatch({ type: 'DELETE_INGREDIENT', payload: id });
            } catch (e: any) {
                console.error('Error deleting ingredient:', e);
                alert('Data Service > Error deleting ingredient\n' + e?.message);
                return;
            }
        },

        /**
         * Gets all recipes of the user and update the context state
         * @param {boolean} ignoreCache Whether to ignore the cache and fetch the data from the server
         * @returns {Promise<void>}
         */
        getRecipes: async (ignoreCache: boolean = false) => {
            try {
                const recipes = await apiService.getRecipes(ignoreCache);
                dispatch({ type: 'SET_RECIPES', payload: recipes });
            } catch (e: any) {
                console.error('Error getting recipes:', e);
                alert('Data Service > Error getting recipes\n' + e?.message);
                return;
            }
        },

        /**
         * Adds a new recipe to the user's list and update the context state
         * @param {RecipeInput} recipe The recipe to add
         * @returns {Promise<void>}
         */
        addRecipe: async (recipe: RecipeInput) => {
            try {
                const addedRecipe = await apiService.addRecipe(recipe);
                dispatch({ type: 'ADD_RECIPE', payload: addedRecipe });
            } catch (e: any) {
                console.error('Error adding recipe:', e);
                alert('Data Service > Error adding recipe\n' + e?.message);
                return;
            }
        },

        /**
         * Updates a recipe of the user and update the context state
         * @param {string} id The ID of the recipe to update
         * @param {RecipeInput} recipe The updated recipe
         * @returns {Promise<void>}
         */
        updateRecipe: async (id: string, recipe: RecipeInput) => {
            try {
                const updatedRecipe = await apiService.updateRecipe(id, recipe);
                dispatch({ type: 'UPDATE_RECIPE', payload: updatedRecipe });
            } catch (e: any) {
                console.error('Error updating recipe:', e);
                alert('Data Service > Error updating recipe\n' + e?.message);
                return;
            }
        },

        /**
         * Deletes a recipe of the user and update the context state
         * @param {string} id The ID of the recipe to delete
         * @returns {Promise<void>}
         */
        deleteRecipe: async (id: string) => {
            try {
                await apiService.deleteRecipe(id);
                dispatch({ type: 'DELETE_RECIPE', payload: id });
            } catch (e: any) {
                console.error('Error deleting recipe:', e);
                alert('Data Service > Error deleting recipe\n' + e?.message);
                return;
            }
        }
    }
}