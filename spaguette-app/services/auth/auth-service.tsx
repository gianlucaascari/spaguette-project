import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Redirect, useRouter } from "expo-router";
import { apiService } from "../api/api-service";
import { useDataService } from "../data/data-service";
import { ActivityIndicator, View } from "react-native";

export const useAuthService = () => {
    const { authState, dispatch } = useContext(AuthContext)
    const router = useRouter()
    const dataService = useDataService()
    
    return {
        isAuthenticated: async () => {
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
        verifyAuth: () => {
            if (authState.loading) return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" />
                </View>
              )

            if (!authState.user) return <Redirect href='/(auth)/sign-in' />
        },
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
        logOut: async () => {
            dispatch({ type: 'RESET_STATE' })
            await apiService.clearCache()
            dataService.resetState()
            await AsyncStorage.removeItem('authUser')

            router.replace('/(auth)/sign-in')
        }
    }
}