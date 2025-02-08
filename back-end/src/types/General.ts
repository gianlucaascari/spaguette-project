import DataLoader from "dataloader"
import { DbUser, DbFriendship } from "./User.js"
import { Db, ObjectId } from "mongodb"
import { DbIngredient, DbRecipe } from "./Catalogue.js"
import { PubSub } from "graphql-subscriptions"

export type Context = {
    db: Db                                                            // istanza del database
    user?: DbUser                                                     // utente corrente
    friendshipLoader: DataLoader<ObjectId, DbFriendship[], string>    // loader per le amicizie
    userLoader: DataLoader<ObjectId, DbUser, string>                // loader per gli utenti
    recipeLoader: DataLoader<ObjectId, DbRecipe, string>            // loader per le ricette
    ingredientLoader: DataLoader<ObjectId, DbIngredient, string>    // loader per gli ingredienti
    pubsub: PubSub                                                    // sistema pub/sub per le sottoscrizioni
  }