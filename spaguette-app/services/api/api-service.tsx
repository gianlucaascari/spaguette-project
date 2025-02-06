import { gql } from '@apollo/client';
import client from './apollo-client';
import { apiServicePlan } from './api-service-plan';
import { apiServiceUser } from './api-service-user';

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
  mutation AddIngredient($name: String!, $UdM: String!) {
    addIngredient(name: $name, unityOfMeasure: $UdM) {
      id
      name
      unityOfMeasure
    }
  }
`;

const UPD_INGRE = gql`
  mutation UpdIngredient($id: ID!, $name: String!, $UdM: String!) {
    updIngredient(id: $id, name: $name, unityOfMeasure: $UdM) {
      id
      name
      unityOfMeasure
    }
  }
`;

const REM_INGRE = gql`
  mutation RemIngredient($remIngredientId: ID!) {
    remIngredient(id: $remIngredientId)
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
   * Fetch all ingredients from the database
   * @returns {Promise<Ingredient[]>} A promise that resolves to an array of ingredients
   * @throws {Error} If an error occurs while fetching the ingredients
   */
  getIngredients: async (): Promise<Ingredient[]> => {
      const response = await client.query<{ getMyIngredients: Ingredient[] }>({ query: GET_MY_INGRE });
      return response.data.getMyIngredients;
  },

  /**
   * Add a new ingredient to the remote database
   * @param {IngredientInput} ingredient The ingredient to add
   * @returns {Promise<Ingredient>} A promise that resolves to the added ingredient
   * @throws {Error} If an error occurs while adding the ingredient
   */
  addIngredient: async (ingredient: IngredientInput): Promise<Ingredient> => {
      const response = await client.mutate<{ addIngredient: Ingredient }>({ mutation: ADD_INGRE, variables: { name: ingredient.name, UdM: ingredient.unityOfMeasure } });
      if (!response.data) throw new Error('No data received from mutation');
      return response.data.addIngredient;
  },

  /**
   * Update an ingredient on the remote database
   * @param {string} id The ID of the ingredient to update
   * @param {IngredientInput} ingredient The updated ingredient
   * @returns {Promise<Ingredient>} A promise that resolves to the updated ingredient
   * @throws {Error} If an error occurs while updating the ingredient
   */
  updateIngredient: async (id: string, ingredient: IngredientInput): Promise<Ingredient> => {
    const response = await client.mutate<{ updIngredient: Ingredient }>({ mutation: UPD_INGRE, variables: { id: id, name: ingredient.name, UdM: ingredient.unityOfMeasure } });
    if (!response.data) throw new Error('No data received from mutation');
    return response.data.updIngredient;
  },

  /**
   * Remove an ingredient from the remote database
   * @param {string} id The ID of the ingredient to remove
   * @returns {Promise<boolean>} A promise that resolves to true if the ingredient was removed
   * @throws {Error} If an error occurs while removing the ingredient
   */
  deleteIngredient: async (id: string): Promise<boolean> => {
    const response = await client.mutate<{ remIngredient: boolean }>({ mutation: REM_INGRE, variables: { remIngredientId: id } });
    if (!response.data) throw new Error('No data received from mutation');
    return response.data.remIngredient;
  },

  /**
   * Fetch all recipes from the remote database
   * @returns {Promise<Recipe[]>} A promise that resolves to an array of recipes
   * @throws {Error} If an error occurs while fetching the recipes
   */
  getRecipes: async (): Promise<Recipe[]> => {
      const response = await client.query<{ getMyRecipes: Recipe[] }>({ query: GET_MY_RECIP });
      return response.data.getMyRecipes;
  },

  /**
   * Add a new recipe to the remote database
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
   * Update a recipe on the remote database
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
   * Remove a recipe from the remote database
   * @param {string} id The ID of the recipe to remove
   * @returns {Promise<boolean>} A promise that resolves to true if the recipe was removed
   * @throws {Error} If an error occurs while removing the recipe
   */
  deleteRecipe: async (id: string): Promise<boolean> => {
    const response = await client.mutate<{ remRecipe: boolean }>({ mutation: REM_RECIP, variables: { remRecipeId: id } });
    if (!response.data) throw new Error('No data received from mutation');
    return response.data.remRecipe;
  },
  ... apiServicePlan,
  ... apiServiceUser,
  clearCache: async () => {
    await client.clearStore()
  }
};