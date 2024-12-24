import { useContext } from "react";
import { DataContext } from "./DataContext";
import { apiService } from "../api/api-service";

export const dataServicePlan = () => {
    const { dispatch } = useContext(DataContext);

    return {
        getMyPlan: async () => {
            try {
                const plan = await apiService.getMyPlan();
                dispatch({ type: 'SET_PLAN', payload: plan });
            } catch (e: any) {
                console.error('Error getting plan:', e);
                alert('Data Serive > Error getting plan\n' + e?.message);
                return;
            }
        },
    }
}