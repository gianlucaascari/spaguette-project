import { ObjectId } from "mongodb"

export type DbIngredient = DbIngredientInput & {
    _id: ObjectId,
}

export type DbIngredientInput = {
    userID: ObjectId,
    name: string,
    unityOfMeasure: UnityOfMeasure,
}
  
export type IngredientInput = {
    name: string
    unityOfMeasure: UnityOfMeasure
}

enum UnityOfMeasure {
    GR = 'GR',
    ML = 'ML',
    PC = 'PC',
}

export type DbRecipe = DbRecipeInput &{
    _id: ObjectId
}

export type DbRecipeInput = {
    userID?: ObjectId
    name: string
    description?: string
    stepsLink?: string
    ingredients: DbIngredientQuantity[]
}

export type DbIngredientQuantity = {
    ingredientID: ObjectId
    quantity: number
}

export type RecipeInput = {
    name: string
    description?: string
    stepsLink?: string
    ingredients: {
        quantity: number;
        ingredientID: string;
    }[]
}