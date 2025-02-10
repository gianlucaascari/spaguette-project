import { ObjectId } from "mongodb"
import { AddRequest, DbAddRequest, DbList, DbPlan, List, Plan } from "./Plan.js"

export type User = {
  id: string
  name: string
  email: string
  password: string
  plan?: Plan
  list?: List
  addRequests?: [AddRequest]
}

export type DbUser = DbUserInput & {
  _id: ObjectId
}

export type DbUserInput = {
  name: string
  email: string
  password: string
  plan: DbPlan
  list: DbList
  addRequests: DbAddRequest[]
}

export type AuthUser = {
  user: User
  token: string
}

export type DbAuthUser = {
  user: DbUser,
  token: string,
}

export type OthUser = {
  status: number
  user: User
}

export type DbOthUser = {
  user: DbUser
  status?: number
}

export type DbFriendship = DbFriendshipInput & {
  _id: ObjectId
}

export type DbFriendshipInput = {
  senderID: ObjectId,
  receiverID: ObjectId,
  status: number,
  date: number,
}

export type SignInInput = {
  email: string,
  password: string,
}

export type SignUpInput = {
  name: string,
  email: string,
  password: string,
}
  