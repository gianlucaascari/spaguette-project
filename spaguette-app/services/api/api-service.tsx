import { gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import React from 'react';

const GET_MY_INGRE = gql`
  query GetIngredients {
    getMyIngredients {
      id
      name
      unityOfMeasure
    }
  }
`;

// Define Ingredient type
type Ingredient = {
  id: string;
  name: string;
  unityOfMeasure: string;
};

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
};

// Apollo Provider Wrapper
import { ReactNode } from 'react';
import client from './apollo-client';

export const ApolloProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);