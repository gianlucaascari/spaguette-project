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
      name
      id
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

// API Service
export const apiService = {
  getIngredients: async (): Promise<Ingredient[]> => {
    try {
      const response = await client.query<{ getMyIngredients: Ingredient[] }>({ query: GET_MY_INGRE });
      return response.data.getMyIngredients;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getRecipes: async (): Promise<Recipe[]> => {
    try {
      const response = await client.query<{ getMyRecipes: Recipe[] }>({ query: GET_MY_RECIP });
      return response.data.getMyRecipes;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
};