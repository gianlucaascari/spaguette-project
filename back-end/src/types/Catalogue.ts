import { ObjectId } from "mongodb"
import { User } from "./User.js"

export type Ingredient = {
    id: string
    user?: User
    name: string
    unityOfMeasure: string
}
  
export type IngredientInput = {
    name: string;
    unityOfMeasure: string;
}

export type DbIngredient = DbIngredientInput & {
    _id: ObjectId,
}

export type DbIngredientInput = {
    userID: string,
    name: string,
    unityOfMeasure: string,
}

export type Recipe = {
    id: string
    user?: User
    name: string
    description?: string
    stepsLink?: string
    ingredients: {
        quantity: number;
        ingredient: Ingredient;
    }[]
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