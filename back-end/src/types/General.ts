import DataLoader from "dataloader"
import { DbUser, DbFriendship } from "./User.js"
import { Db } from "mongodb"
import { DbIngredient, DbRecipe } from "./Catalogue.js"
import { PubSub } from "graphql-subscriptions"

export type Context = {
    db: Db                                                      // istanza del database
    user?: DbUser                                               // utente corrente
    friendshipLoader: DataLoader<string, DbFriendship[], string>    // loader per le amicizie
    userLoader: DataLoader<string, DbUser[], string>                // loader per gli utenti
    recipeLoader: DataLoader<string, DbRecipe[], string>            // loader per le ricette
    ingredientLoader: DataLoader<string, DbIngredient[], string>    // loader per gli ingredienti
    pubsub: PubSub                                              // sistema pub/sub per le sottoscrizioni
  }