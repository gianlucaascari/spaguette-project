import { split, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
// import { createClient } from 'graphql-ws';
// import { getMainDefinition } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// const getToken = async () => await AsyncStorage.getItem('token');

const httpLink = new HttpLink({
   uri: "http://localhost:4000",
  // uri: "https://7afc-193-190-253-145.ngrok-free.app",
});

// const wsLink = new GraphQLWsLink(createClient({
//    //url: "http://localhost:4000/subscriptions",
//    url: "https://7afc-193-190-253-145.ngrok-free.app/subscriptions",
//   connectionParams: async () => {
//     const authUserString = await AsyncStorage.getItem('authUser')
//     const authUser = authUserString ? JSON.parse(authUserString) : {} 
//     return {
//       authorization: authUser.token || '',
//     }
//   }
// }))

const authLink = setContext(async (_, { headers }) => {
  const authUserString = await AsyncStorage.getItem('authUser')
  const authUser = authUserString ? JSON.parse(authUserString) : {}
  return {
    headers: {
      ...headers,
      authorization: authUser.token || '',
    },
  };
});

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   authLink.concat(httpLink),
// );

const client = new ApolloClient({
  // link: splitLink,
  link: authLink.concat(httpLink),
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
