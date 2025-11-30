import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import "react-native-reanimated";

import { ApolloProvider } from "@apollo/client";
import client from "@/services/api/apollo-client";
import { DataContext, DataProvider } from "@/services/data/DataContext";
import { View } from "react-native";
import { AuthProvider } from "@/services/auth/AuthContext";

import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: 'tabs',
// };

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {

//   const { state } = useContext(DataContext)

//   return (
//       <DataProvider>
//         <ApolloProvider client={client}>
//
//           {/* <Stack>
//             {state.user == undefined ?
//             <View>
//               <Stack.Screen name='(auth)/sign-up' options={{ title: 'Sign Up', headerShown: false }} />
//               <Stack.Screen name='(auth)/sign-in' options={{ title: 'Sign In', headerShown: false }} />
//             </View>
//             :
//             <View>
//               <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//             </View>
//             }
//           </Stack> */}
//         </ApolloProvider>
//       </DataProvider>
//   );
// }

export default function StackLayout() {
  // Set up the auth context and render our layout inside of it.
  return (
    <AuthProvider>
      <DataProvider>
        <ApolloProvider client={client}>
          <GluestackUIProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </GluestackUIProvider>
        </ApolloProvider>
      </DataProvider>
    </AuthProvider>
  );
}
