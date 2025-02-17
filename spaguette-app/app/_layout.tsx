
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { ApolloProvider } from '@apollo/client';
import client from '@/services/api/apollo-client';
import { DataProvider } from '@/services/data/DataContext';
import { AuthProvider } from '@/services/auth/AuthContext';

export default function StackLayout() {
  // Set up the auth context and render our layout inside of it.
  return (
    <AuthProvider>
      <DataProvider>
        <ApolloProvider client={client}>
          <Stack screenOptions={{ headerShown: false }}/>
        </ApolloProvider>
      </DataProvider>
    </AuthProvider>
  );
}
