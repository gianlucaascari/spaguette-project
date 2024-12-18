import { createContext, ReactNode, useReducer } from "react";

/**
 * interface for the global state
 * @interface State
 * @property {Recipe[]} recipes - list of recipes
 * @property {Ingredient[]} ingredients - list of ingredients
 */
interface State {
    recipes: Recipe[];
    ingredients: Ingredient[];
}

/**
 * action type for the global state
 * @typedef {Object} Action
 * @property {string} type - action type
 * @property {Recipe[] | Ingredient[]} payload - action payload
 */
type Action = 
    | { type: 'SET_RECIPES'; payload: Recipe[] }
    | { type: 'SET_INGREDIENTS'; payload: Ingredient[] }
    | { type: 'ADD_RECIPE'; payload: Recipe }
    | { type: 'UPDATE_RECIPE'; payload: Recipe }
    | { type: 'REMOVE_RECIPE'; payload: string };

const initialState: State = {
    recipes: [],
    ingredients: [],
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_RECIPES":
            return { ...state, recipes: action.payload };
        case "SET_INGREDIENTS":
            return { ...state, ingredients: action.payload };
        case "ADD_RECIPE":
            return { ...state, recipes: [...state.recipes, action.payload] };
        case "UPDATE_RECIPE":
            return { ...state, recipes: state.recipes.map(recipe => recipe.id === action.payload.id ? action.payload : recipe) };
        case "REMOVE_RECIPE":
            return { ...state, recipes: state.recipes.filter(recipe => recipe.id !== action.payload) };
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