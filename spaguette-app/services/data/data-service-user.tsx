import { useContext } from "react";
import { DataContext } from "./DataContext";
import { apiService } from "../api/api-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";


export const useDataServiceUser = () => {
    const { state, dispatch } = useContext(DataContext)
    const router = useRouter()

    return {
        signIn: async (input: SignInInput) => {
            try {
                const authUser = await apiService.signIn(input)
                dispatch({ type: 'SET_USER', payload: authUser.user})
                await AsyncStorage.setItem("userToken", authUser.token)
                router.replace('/(tabs)/plan-page')
            }
            catch (e: any) {
                console.error('Error updating in plan:', e);
                alert('Data Serive > Error signing in\n' + e?.message);
                return;
            }
        },
        signUp: async (input: SignUpInput) => {
            try{
                const authUser = await apiService.signUp(input)
                dispatch({ type: 'SET_USER', payload: authUser.user })
                await AsyncStorage.setItem("userToken", authUser.token)
                router.replace('/(tabs)/plan-page')
            }
            catch (e: any) {
                console.error('Error updating in plan:', e);
                alert('Data Serive > Error signing up\n' + e?.message);
                return;
            }
        },
        logOut: async () => {
            dispatch({ type: 'RESET_STATE' })
            await apiService.clearCache()
            await AsyncStorage.removeItem('userToken')

            router.replace('/(auth)/sign-in')
        }
    }
}