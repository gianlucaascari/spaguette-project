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

// API Service
export const apiService = {
  getIngredients: async (): Promise<Ingredient[]> => {
    try {
      const response = await client.query<{ getMyIngredients: Ingredient[] }>({ query: GET_MY_INGRE });
      return response.data.getMyIngredients;
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  },
  getRecipes: async (): Promise<Recipe[]> => {
    try {
      const response = await client.query<{ getMyRecipes: Recipe[] }>({ query: GET_MY_RECIP });
      return response.data.getMyRecipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },
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