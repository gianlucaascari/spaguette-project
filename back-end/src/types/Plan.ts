import { ObjectId } from "mongodb"
import { Ingredient, Recipe } from "./Catalogue.js"
import { DbUser, User } from "./User.js"

export type Plan = {
  recipes: {
      recipe: Recipe
      user?: User
      numTimes: number
    }[]
}

export type PlanInput = {
  recipes: PlanRecipeInput[]
}

export type PlanRecipeInput = {
  recipeID: string
  userID?: string
  numTimes: number
}

export type DbPlan = {
  recipes: DbRecipeQuantity []
}

export type DbRecipeQuantity = {
  recipeID: string    // why string?
  userID?: string     // why string?
  numTimes: number
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
  items: DbListItem []
}

export type DbListItem = {
  ingredientID: string    // why string?
  userID?: string
  quantity: number
  taken: boolean
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
  addRequest: DbAddRequest
  addMode: boolean
}


// PUBSUB MESSAGES

export type NewAddRequest = {
  toUser: string
  recAddRequest: ReceivedAddRequest
}

export type AnsweredAddRequest = {
  answeringUserID: ObjectId
  addRequest: DbAddRequest
}

export type PlanUpdate = {
  updatingUserID: ObjectId
  updatedUserID: ObjectId
  plan: DbPlan
}