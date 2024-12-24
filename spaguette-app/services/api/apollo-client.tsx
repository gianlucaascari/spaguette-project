import { split, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws';
import { getMainDefinition } from "@apollo/client/utilities";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// const getToken = async () => await AsyncStorage.getItem('token');

const httpLink = new HttpLink({
   uri: "http://localhost:4000",
  //uri: "https://d9af-81-164-118-42.ngrok-free.app/",
});

const wsLink = new GraphQLWsLink(createClient({
   url: "http://localhost:4000/subscriptions",
  //url: "https://d9af-81-164-118-42.ngrok-free.app/subscriptions",
  connectionParams: async () => {
    // const token = await getToken()
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjhmMWU2Yjg2OWU0MTNjZDM1YjkwNiIsImlhdCI6MTczNTAzODY4OH0.Y3buogE9GrS5gYZ_NhAHdmB6L0qOBZyKSc3P-sTvOsY"
    return {
      authorization: token || '',
    }
  }
}))

const authLink = setContext(async (_, { headers }) => {
  // const token = await getToken();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjhmMWU2Yjg2OWU0MTNjZDM1YjkwNiIsImlhdCI6MTczNTAzODY4OH0.Y3buogE9GrS5gYZ_NhAHdmB6L0qOBZyKSc3P-sTvOsY"

  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const resetApolloClient = async () => {
  try {
    // await AsyncStorage.removeItem('token');
    await client.clearStore();
  } catch (error) {
    console.error("Error resetting Apollo client:", error);
  }
};

export default client;
