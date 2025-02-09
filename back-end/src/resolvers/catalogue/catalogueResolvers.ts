import { ObjectId } from "mongodb";
import { DbIngredient, DbIngredientQuantity, DbRecipe } from "types/Catalogue.js";
import { Context } from "types/General.js";
import { DbUser } from "types/User.js";

const CatalogueResolvers = {
  Ingredient: {
    id: ({ _id }: DbIngredient) => _id.toString(),
    user: async ({ userID }: DbIngredient, _: unknown, { userLoader }: Context): Promise<DbUser | undefined> => {
      return userID ? userLoader.load(new ObjectId(userID)) : undefined;
    },
  },
  Recipe: {
    id: ({ _id }: DbRecipe) => _id.toString(),
    user: async ({ userID }: DbRecipe, _:unknown, { userLoader }: Context): Promise<DbUser | undefined> => {
      return userID ? userLoader.load(new ObjectId(userID)) : undefined;
    },
  },
  IngredientQuantity: {
    ingredient: async ({ ingredientID }: DbIngredientQuantity, _: unknown, { ingredientLoader }: Context): Promise<DbIngredient> => {
      return ingredientLoader.load(new ObjectId(ingredientID))
    }
  }
};

export { CatalogueResolvers };
