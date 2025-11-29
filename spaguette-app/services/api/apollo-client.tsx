import { split, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws';
import { getMainDefinition } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCache } from "apollo3-cache-persist";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// const getToken = async () => await AsyncStorage.getItem('token');

const cache = new InMemoryCache();

// Persist the cache in AsyncStorage
(async () => {
  try {
    await persistCache({
      cache,
      storage: AsyncStorage,
    });
  } catch (error) {
    console.error("Error restoring Apollo cache:", error);
  }
})();

const httpLink = new HttpLink({
  //  uri: "http://localhost:4000",
  uri: "https://spaguette-api.ascari.it",
});

const wsLink = typeof window !== "undefined"
  ? new GraphQLWsLink(createClient({
      //url: "http://localhost:4000/subscriptions",
      url: "https://spaguette-api.ascari.it/subscriptions",
      connectionParams: async () => {
        const authUserString = await AsyncStorage.getItem('authUser')
        const authUser = authUserString ? JSON.parse(authUserString) : {} 
        return {
          authorization: authUser.token || '',
        }
      }
    }))
  : null;

const authLink = setContext(async (_, { headers }) => {
  const authUserString = await AsyncStorage.getItem('authUser');
  const authUser = authUserString ? JSON.parse(authUserString) : {};
  return {
    headers: {
      ...headers,
      authorization: authUser.token || '',
    },
  };
});

const splitLink = typeof window !== "undefined" && wsLink != null
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      authLink.concat(httpLink),
    )
  : httpLink;


const client = new ApolloClient({
  link: splitLink,
  // link: authLink.concat(httpLink),
  cache,
});

export const resetApolloClient = async () => {
  try {
    await AsyncStorage.removeItem('apollo-cache-persist'); // Cancella la cache salvata
    await AsyncStorage.removeItem('authUser'); // Cancella l'utente autenticato
    await client.clearStore(); // Cancella la cache in memoria
  } catch (error) {
    console.error("Error resetting Apollo client:", error);
  }
};

export default client;
