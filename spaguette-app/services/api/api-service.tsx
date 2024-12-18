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

const ADD_INGRE = gql`
  mutation AddIngredient($name: String!, $unityOfMeasure: String!) {
    addIngredient(name: $name, unityOfMeasure: $unityOfMeasure) {
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
      stepsLink
      description
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

const UPD_RECIP = gql`
  mutation UpdRecipe($id: ID!, $input: RecipeInput!) {
    updRecipe(id: $id, input: $input) {
      id
      name
      stepsLink
      description
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

const REM_RECIP = gql`
  mutation RemRecipe($remRecipeId: ID!) {
    remRecipe(id: $remRecipeId)
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
      const response = await client.query<{ getMyIngredients: Ingredient[] }>({ query: GET_MY_INGRE });
      return response.data.getMyIngredients;
  },

  /**
   * Add a new ingredient to the server
   * @param {IngredientInput} ingredient The ingredient to add
   * @returns {Promise<Ingredient>} A promise that resolves to the added ingredient
   * @throws {Error} If an error occurs while adding the ingredient
   */
  addIngredient: async (ingredient: IngredientInput): Promise<Ingredient> => {
      const response = await client.mutate<{ addIngredient: Ingredient }>({ mutation: ADD_INGRE, variables: { name: ingredient.name, unityOfMeasure: ingredient.unityOfMeasure } });
      if (!response.data) throw new Error('No data received from mutation');
      return response.data.addIngredient;
  },

  /**
   * Fetch all recipes from the server
   * @returns {Promise<Recipe[]>} A promise that resolves to an array of recipes
   * @throws {Error} If an error occurs while fetching the recipes
   */
  getRecipes: async (): Promise<Recipe[]> => {
      const response = await client.query<{ getMyRecipes: Recipe[] }>({ query: GET_MY_RECIP });
      return response.data.getMyRecipes;
  },

  /**
   * Add a new recipe to the server
   * @param {RecipeInput} recipe The recipe to add
   * @returns {Promise<Recipe>} A promise that resolves to the added recipe
   * @throws {Error} If an error occurs while adding the recipe
   */
  addRecipe: async (recipe: RecipeInput): Promise<Recipe> => {
      const response = await client.mutate<{ addRecipe: Recipe }>({ mutation: ADD_RECIP, variables: { input: recipe } });
      if (!response.data) throw new Error('No data received from mutation');
      return response.data.addRecipe;
  },

  /**
   * Update a recipe on the server
   * @param {string} id The ID of the recipe to update
   * @param {RecipeInput} recipe The updated recipe
   * @returns {Promise<Recipe>} A promise that resolves to the updated recipe
   * @throws {Error} If an error occurs while updating the recipe
   */
  updateRecipe: async (id: string, recipe: RecipeInput): Promise<Recipe> => {
    const response = await client.mutate<{ updRecipe: Recipe }>({ mutation: UPD_RECIP, variables: { input: recipe, id: id}})
    if(!response.data) throw new Error('No data received from mutation')
    return response.data.updRecipe
  },

  /**
   * Remove a recipe from the server
   * @param {string} id The ID of the recipe to remove
   * @returns {Promise<boolean>} A promise that resolves to true if the recipe was removed
   * @throws {Error} If an error occurs while removing the recipe
   */
  removeRecipe: async (id: string): Promise<boolean> => {
    const response = await client.mutate<{ remRecipe: boolean }>({ mutation: REM_RECIP, variables: { remRecipeId: id } });
    if (!response.data) throw new Error('No data received from mutation');
    return response.data.remRecipe;
  }
};