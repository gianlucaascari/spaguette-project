import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Redirect, useRouter } from "expo-router";
import { apiService } from "../api/api-service";
import { useDataService } from "../data/data-service";
import { ActivityIndicator, View } from "react-native";
import { SignInInput, SignUpInput } from "@/types/application/User";

/**
 * Auth Service to handle authentication methods and context
 */
export const useAuthService = () => {
    const { authState, dispatch } = useContext(AuthContext)
    const router = useRouter()
    const dataService = useDataService()
    
    return {
        /**
         * Trigger the verification of the authentication state
         * During verify operation, it will set the loading state to true
         * If the user is authenticated, it will set the user in the context
         * If the user is not authenticated, it will do nothing
         */
        triggerAuthVerification: async () => {
            dispatch({ type: 'SET_LOADING', payload: true })
            
            let authUserString;
            try {
                authUserString = await AsyncStorage.getItem('authUser')
            } catch (error) {
                console.error('Error reading from AsyncStorage:', error);
                dispatch({ type: 'SET_LOADING', payload: false });
                return false;
            }

            if (authUserString) dispatch({ type: 'SET_USER', payload: (JSON.parse(authUserString)).user })
            dispatch({ type: 'SET_LOADING', payload: false })
        },

        /**
         * Verify the authentication state
         * During verify operation, it will show a loading spinner
         * If the user is not authenticated, it will redirect to the sign-in page
         * If the user is authenticated, it will do nothing
         */
        verifyAuthState: () => {
            if (authState.loading) return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" />
                </View>
              )

            if (!authState.user) return <Redirect href='/(auth)/sign-in' />
        },

        /**
         * Allows the user to sign in
         * If the sign in is successful, it will set the user in the context, in the local storage 
         * and redirect to the plan page
         * @param input The sign in input
         * @returns void
         */
        signIn: async (input: SignInInput) => {
            try {
                const authUser = await apiService.signIn(input)
                dispatch({ type: 'SET_USER', payload: authUser.user})
                await AsyncStorage.setItem("authUser", JSON.stringify(authUser))
                router.replace('/(protected)/(tabs)/plan-page')
            }
            catch (e: any) {
                console.error('Error signing in:', e);
                alert('Data Serive > Error signing in\n' + e?.message);
                return;
            }
        },

        /**
         * Allows the user to sign up
         * If the sign up is successful, it will set the user in the context, in the local storage 
         * and redirect to the plan page
         * @param input The sign up input
         * @returns void
         */
        signUp: async (input: SignUpInput) => {
            try{
                const authUser = await apiService.signUp(input)
                dispatch({ type: 'SET_USER', payload: authUser.user })
                await AsyncStorage.setItem("authUser", JSON.stringify(authUser))
                router.replace('/(protected)/(tabs)/plan-page')
            }
            catch (e: any) {
                console.error('Error signing up:', e);
                alert('Data Serive > Error signing up\n' + e?.message);
                return;
            }
        },

        /**
         * Allows the user to sign out
         * It will reset the auth-state, clear the cache of the api-service, 
         * remove the user from async-storage, reset the data-service state 
         * and redirect to the sign-in page
         */
        logOut: async () => {
            dispatch({ type: 'RESET_STATE' })
            await apiService.clearCache()
            dataService.resetState()
            await AsyncStorage.removeItem('authUser')

            router.replace('/(auth)/sign-in')
        }
    }
}