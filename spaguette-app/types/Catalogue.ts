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

export type IngredientQuantityInput = {
  ingredientID: string,
  quantity: number,
}

export type OptionalIngredientQuantityInput = {
  ingredientID: string | undefined,
  quantity: number | undefined,
}

export type RecipeInput = {
  name: string;
  description?: string;
  stepsLink?: string;
  ingredients: IngredientQuantityInput[];
};

export type OptionalRecipeInput = {
  name: string;
  description?: string;
  stepsLink?: string;
  ingredients: OptionalIngredientQuantityInput[];
}

export function isCompleteIngredient(
  item: OptionalIngredientQuantity
): item is IngredientQuantity {
  return item.ingredient !== undefined && item.quantity !== undefined;
}

export function isCompleteIngredientInput(
  item: OptionalIngredientQuantityInput
): item is IngredientQuantityInput {
  return item.ingredientID !== undefined && item.quantity !== undefined;
}
