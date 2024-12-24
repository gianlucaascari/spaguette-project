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