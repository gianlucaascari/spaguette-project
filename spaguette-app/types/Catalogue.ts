type Ingredient = {
    id: string;
    name: string;
    unityOfMeasure: string;
  };

type Recipe = {
    id: string;
    name: string;
    ingredients: {
        quantity: number;
        ingredient: Ingredient;
    }[];
};