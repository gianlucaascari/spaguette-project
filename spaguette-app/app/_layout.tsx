import { Stack } from "expo-router";
import "react-native-reanimated";

import { ApolloProvider } from "@apollo/client";
import client from "@/services/api/apollo-client";
import { DataProvider } from "@/services/data/DataContext";
import { useColorScheme, View } from "react-native";
import { AuthProvider } from "@/services/auth/AuthContext";

import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

export default function StackLayout() {

  const colorScheme = useColorScheme();

  // Set up the auth context and render our layout inside of it.
  return (
    <AuthProvider>
      <DataProvider>
        <ApolloProvider client={client}>
          <GluestackUIProvider mode={colorScheme || "light"}>
            <Stack screenOptions={{ headerShown: false }} />
          </GluestackUIProvider>
        </ApolloProvider>
      </DataProvider>
    </AuthProvider>
  );
}
