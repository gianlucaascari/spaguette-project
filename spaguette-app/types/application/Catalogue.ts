export type Ingredient = {
    id: string;
    name: string;
    unityOfMeasure: UnityOfMeasure;
};

export type IngredientInput = {
    name: string;
    unityOfMeasure: UnityOfMeasure;
}

export enum UnityOfMeasure {
    GR = "GR",
    ML = "ML",
    PC = "PC",
}

export type Recipe = {
    id: string;
    name: string;
    description?: string;
    stepsLink?: string;
    ingredients: {
        quantity: number;
        ingredient: Ingredient;
    }[];
};

export type RecipeInput = {
    name: string;
    description?: string;
    stepsLink?: string;
    ingredients: {
        quantity: number;
        ingredientID: string;
    }[];
};