import { gql } from '@apollo/client';
import client from './apollo-client';

const GET_MY_INGRE = gql`
  query GetIngredients {
    getMyIngredients {
      id
      name
      unityOfMeasure
    }
  }
`;

const GET_MY_RECIP = gql`
  query GetMyRecipes {
    getMyRecipes {
      id
      name
      ingredients {
        quantity
        ingredient {
          id
          name
          unityOfMeasure
        }
      }
    }
  }
`;

const ADD_RECIP = gql`
  mutation AddRecipe($input: RecipeInput!) {
    addRecipe(input: $input) {
      id
      name
      ingredients {
        ingredient {
          id
          name
          unityOfMeasure
        }
        quantity
      }
    }
  }
`;

/**
 * API service to fetch and manipulate data from the server
 * @module services/api/api-service
 * @see module:services/data/data-service
 * @see module:types/Catalogue
 */
export const apiService = {

  /**
   * Fetch all ingredients from the server
   * @returns {Promise<Ingredient[]>} A promise that resolves to an array of ingredients
   * @throws {Error} If an error occurs while fetching the ingredients
   */
  getIngredients: async (): Promise<Ingredient[]> => {
    try {
      const response = await client.query<{ getMyIngredients: Ingredient[] }>({ query: GET_MY_INGRE });
      return response.data.getMyIngredients;
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  },

  /**
   * Fetch all recipes from the server
   * @returns {Promise<Recipe[]>} A promise that resolves to an array of recipes
   * @throws {Error} If an error occurs while fetching the recipes
   */
  getRecipes: async (): Promise<Recipe[]> => {
    try {
      const response = await client.query<{ getMyRecipes: Recipe[] }>({ query: GET_MY_RECIP });
      return response.data.getMyRecipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  /**
   * Add a new recipe to the server
   * @param {RecipeInput} recipe The recipe to add
   * @returns {Promise<Recipe>} A promise that resolves to the added recipe
   * @throws {Error} If an error occurs while adding the recipe
   */
  addRecipe: async (recipe: RecipeInput): Promise<Recipe> => {
    try {
      const response = await client.mutate<{ addRecipe: Recipe }>({ mutation: ADD_RECIP, variables: { input: recipe } });
      if (!response.data) throw new Error('No data received from mutation');
      return response.data.addRecipe;
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }
  },
};