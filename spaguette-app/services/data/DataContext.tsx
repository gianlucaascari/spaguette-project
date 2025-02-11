import { Ingredient, Recipe } from "@/types/Catalogue";
import { List, Plan } from "@/types/Plan";
import { createContext, ReactNode, useReducer } from "react";

interface ContextState {
    recipes: Recipe[];
    ingredients: Ingredient[];
    plan: Plan;
    list: List;
}

type Action = 
    | { type: 'SET_INGREDIENTS'; payload: Ingredient[] }
    | { type: 'ADD_INGREDIENT'; payload: Ingredient }
    | { type: 'UPDATE_INGREDIENT'; payload: Ingredient }
    | { type: 'DELETE_INGREDIENT'; payload: string }
    | { type: 'SET_RECIPES'; payload: Recipe[] }
    | { type: 'ADD_RECIPE'; payload: Recipe }
    | { type: 'UPDATE_RECIPE'; payload: Recipe }
    | { type: 'DELETE_RECIPE'; payload: string }
    | { type: 'SET_PLAN'; payload: Plan }
    | { type: 'SET_LIST'; payload: List }
    | { type: 'RESET_STATE' }

const initialState: ContextState = {
    recipes: [],
    ingredients: [],
    plan: { recipes: [] },
    list: { items: [] },
};

const reducer = (state: ContextState, action: Action): ContextState => {
    switch (action.type) {
        case "SET_INGREDIENTS":
            return { ...state, ingredients: action.payload };
        case "ADD_INGREDIENT":
            return { ...state, ingredients: [...state.ingredients, action.payload] };
        case "UPDATE_INGREDIENT":
            return { ...state, ingredients: state.ingredients.map(ingredient => ingredient.id === action.payload.id ? action.payload : ingredient) };
        case "DELETE_INGREDIENT":
            return { ...state, ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.payload) };
        case "SET_RECIPES":
            return { ...state, recipes: action.payload };
        case "ADD_RECIPE":
            return { ...state, recipes: [...state.recipes, action.payload] };
        case "UPDATE_RECIPE":
            return { ...state, recipes: state.recipes.map(recipe => recipe.id === action.payload.id ? action.payload : recipe) };
        case "DELETE_RECIPE":
            return { ...state, recipes: state.recipes.filter(recipe => recipe.id !== action.payload) };
        case "SET_PLAN":
            return { ...state, plan: action.payload };
        case "SET_LIST":
            return { ...state, list: action.payload };
        case "RESET_STATE":
            return initialState;
        default:
            return state;
    }
}


export const DataContext = createContext({
    state: initialState,
    dispatch: (action: Action) => {},
});

export function DataProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
}