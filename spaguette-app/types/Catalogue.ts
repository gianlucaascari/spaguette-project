export type Ingredient = {
  id: string;
  name: string;
  unityOfMeasure: UnityOfMeasure;
};

export type IngredientInput = {
  name: string;
  unityOfMeasure: UnityOfMeasure;
};

export enum UnityOfMeasure {
  GR = "GR",
  ML = "ML",
  PC = "PC",
}

export type IngredientQuantity = {
  ingredient: Ingredient;
  quantity: number;
};

export type OptionalIngredientQuantity = {
  ingredient: Ingredient | undefined;
  quantity: number | undefined;
};

export type Recipe = {
  id: string;
  name: string;
  description?: string;
  stepsLink?: string;
  ingredients: IngredientQuantity[];
};

export type OptionalRecipe = {
  id: string;
  name: string;
  description?: string;
  stepsLink?: string;
  ingredients: OptionalIngredientQuantity[];
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

export function isCompleteIngredient(
  item: OptionalIngredientQuantity
): item is IngredientQuantity {
  return item.ingredient !== undefined && item.quantity !== undefined;
}
