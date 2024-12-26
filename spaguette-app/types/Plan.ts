type RecipeQuantity = {
    recipe: Recipe;
    numTimes: number;
};

type Plan = {
    recipes: RecipeQuantity[];
}

type PlanElementInput = {
    recipeID: string;
    numTimes: number;
}

type PlanInput = {
    recipes: PlanElementInput[];
}

type ListItem = {
    ingredient: Ingredient,
    quantity: number,
    taken: boolean,
}

type List = {
    items: ListItem[],
}

type ListItemInput = {
    ingredientID: string, 
    quantity: number,
    taken: boolean,
}

type ListInput = {
    items: ListItemInput[],
}