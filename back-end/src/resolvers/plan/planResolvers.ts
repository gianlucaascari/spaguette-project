import { ObjectId } from "mongodb";
import { DbIngredient, DbRecipe } from "types/Catalogue.js";
import { Context } from "types/General.js";
import { DbAddRequest, DbListItem, DbRecipeQuantity } from "types/Plan.js";
import { DbUser } from "types/User.js";

const PlanResolvers = {
  RecipeQuantity: {
    user: async ({ userID }: DbRecipeQuantity, _: unknown, { userLoader }: Context): Promise<DbUser | undefined> => {
      return userID ? userLoader.load(new ObjectId(userID)) : undefined;
    },
    recipe: async (parent: DbRecipeQuantity, _: unknown, { recipeLoader }: Context): Promise<DbRecipe> => {
      // return parent.recipeID ? recipeLoader.load(new ObjectId(parent.recipeID)) : parent.recipe;
      return recipeLoader.load(new ObjectId(parent.recipeID));
    },
  },
  ListItem: {
    ingredient: async ({ ingredientID }: DbListItem, _: unknown, { ingredientLoader }: Context): Promise<DbIngredient> => {
      return ingredientLoader.load(new ObjectId(ingredientID));
    },
    user: async ({ userID }: DbListItem, _: unknown, { userLoader }: Context): Promise<DbUser | undefined> => {
      return userID ? userLoader.load(new ObjectId(userID)) : undefined;
    },
  },
  AddRequest: {
    user: async ({ userID }: DbAddRequest, _: unknown, { userLoader }: Context): Promise<DbUser> => {
      return userLoader.load(new ObjectId(userID));
    },
    recipe: async ({ recipeID }: DbAddRequest, _: unknown, { recipeLoader }: Context): Promise<DbRecipe> => {
      return recipeLoader.load(new ObjectId(recipeID));
    },
  },
};

export { PlanResolvers };
