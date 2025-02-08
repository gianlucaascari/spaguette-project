import { ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";
import { Context } from "types/General.js";
import { DbIngredient, DbRecipe } from "types/Catalogue.js";

const CatalogueQueries = {
  getMyIngredients: async (
    _: unknown, 
    __: unknown, 
    { db, user }: Context
  ): Promise<DbIngredient[]> => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const ingredients = await db
      .collection(ENV.DB_INGRE_COL)
      .find({ $or: [{ userID: user._id }, { userID: null }] })
      .toArray() as DbIngredient[];

    return ingredients;
  },
  getMyRecipes: async (
    _: unknown, 
    __: unknown, 
    { db, user }: Context
  ): Promise<DbRecipe[]> => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const recipes = await db
      .collection(ENV.DB_RECIP_COL)
      .find({ $or: [{ userID: user._id }, { userID: null }] })
      .toArray() as DbRecipe[];

    return recipes;
  },
  getRecipe: async (
    _: unknown, 
    { recipeID }: { recipeID:string }, 
    { db, user }: Context
  ): Promise<DbRecipe> => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const recipe = await db
      .collection(ENV.DB_RECIP_COL)
      .findOne({ _id: new ObjectId(recipeID)}) as DbRecipe | null;

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return recipe;
  },
};

export { CatalogueQueries };
