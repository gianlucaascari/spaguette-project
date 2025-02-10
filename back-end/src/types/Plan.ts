import { ObjectId } from "mongodb"

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