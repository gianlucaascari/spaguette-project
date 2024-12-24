type RecipeQuantity = {
    recipe: Recipe;
    numTimes: number;
};

type Plan = {
    recipes: RecipeQuantity[];
}