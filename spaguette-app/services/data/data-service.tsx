import { apiService } from "../api/api-service";

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