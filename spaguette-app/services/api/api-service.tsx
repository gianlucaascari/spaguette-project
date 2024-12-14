import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import React from 'react';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'https://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

// Example query
const GET_DATA = gql`
    query GetData {
        data {
            id
            name
            description
        }
    }
`;

// API Service
export const apiService = {
    getData: async () => {
        try {
            const response = await client.query({ query: GET_DATA });
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },
};

// Apollo Provider Wrapper
import { ReactNode } from 'react';

export const ApolloProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);