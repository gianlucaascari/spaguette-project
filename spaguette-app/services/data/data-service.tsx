import { useContext } from "react";
import { apiService } from "../api/api-service";
import { DataContext } from "./DataContext";
import { useDataServicePlan } from "./data-service-plan";
import { IngredientInput, RecipeInput } from "@/types/Catalogue";
import { useDataServiceCatalogue } from "./data-service-catalogue";

/**
 * Data service to fetch and manipulate data, combining API and (soon) local storage
 * @module services/data/data-service
 * @see module:services/api/api-service
 * @see module:types/Catalogue
 */
export const useDataService = () => {
    const { dispatch } = useContext(DataContext);
    
    return {
        ... useDataServiceCatalogue(),
        ... useDataServicePlan(),
        resetState: () => dispatch({ type: 'RESET_STATE' })
    };
};