import { ObjectId } from "mongodb"
import { Ingredient, Recipe } from "./Catalogue.js"
import { User } from "./User.js"

export type Plan = {
  recipes: {
      recipe: Recipe
      user?: User
      numTimes: number
    }[]
}

export type PlanInput = {
  recipes: {
      recipeID: string
      userID?: string
      numTimes: number
    }[]
}

export type DbPlan = {
  recipes: {
    recipeID: string    // why string?
    numTimes: number
  } []
}

export type List = {
  items: {
      ingredient: Ingredient
      user?: User
      quantity: number
      taken: boolean
    } []
}

export type ListInput = {
  items: {
      ingredientID: string
      userID?: string // !!!! IMPORTANT -> reset to mandatory when add the users back
      quantity: number
      taken: boolean
    }[]
}

export type DbList = {
  items: {
    ingredientID: string    // why string?
    quantity: number
    taken: boolean
  } []
}

export type AddRequest = {
  user: User
  recipe: Recipe
  numTimes: number
}

export type DbAddRequest = {
  userID: ObjectId
  recipeID: ObjectId
  numTimes: number
}

export type ReceivedAddRequest = {
  addRequest: AddRequest
  addMode: boolean
}