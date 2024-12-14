import { apiService } from "../api/api-service";

/**
 * Data service to fetch and manipulate data, combining API and (soon) local storage
 * @module services/data/data-service
 * @see module:services/api/api-service
 * @see module:types/Catalogue
 */
export const dataService = {
    getIngredients: async (): Promise<Ingredient[]> => {
        return await apiService.getIngredients();
    },
    getRecipes: async (): Promise<Recipe[]> => {
        return await apiService.getRecipes();
    },
    addRecipe: async (recipe: RecipeInput): Promise<Recipe> => {
        return await apiService.addRecipe(recipe);
    },
};