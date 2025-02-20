import { Ingredient, Recipe } from "./Catalogue";

export type RecipeQuantity = {
    recipe: Recipe;
    numTimes: number;
};

export type Plan = {
    recipes: RecipeQuantity[];
}

export type PlanElementInput = {
    recipeID: string;
    numTimes: number;
}

export type PlanInput = {
    recipes: PlanElementInput[];
}

export type ListItem = {
    ingredient: Ingredient,
    quantity: number,
    taken: boolean,
}

export type List = {
    items: ListItem[],
}

export type ListItemInput = {
    ingredientID: string, 
    quantity: number,
    taken: boolean,
}

export type ListInput = {
    items: ListItemInput[],
}