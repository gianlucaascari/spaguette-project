type Ingredient = {
    id: string;
    name: string;
    unityOfMeasure: string;
  };

type Recipe = {
    id: string;
    name: string;
    description?: string;
    stepsLink?: string;
    ingredients: {
        quantity: number;
        ingredient: Ingredient;
    }[];
};

type RecipeInput = {
    name: string;
    description?: string;
    stepsLink?: string;
    ingredients: {
        quantity: number;
        ingredientId: string;
    }[];
}