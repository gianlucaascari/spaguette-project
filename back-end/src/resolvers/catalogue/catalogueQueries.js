import { ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";

const CatalogueQueries = {
  getMyIngredients: async (_, __, { db, user }) => {
    // check if user is logged
    if (!user) {
      throw new Er("Authentication Error: Please Sign In");
    }

    const ingredients = await db
      .collection(ENV.DB_INGRE_COL)
      .find({ $or: [{ userID: user._id }, { userID: null }] })
      .toArray();

    return ingredients;
  },
  getMyRecipes: async (_, __, { db, user }) => {
    // check if user is logged
    if (!user) {
      throw new Er("Authentication Error: Please Sign In");
    }

    const recipes = await db
      .collection(ENV.DB_RECIP_COL)
      .find({ $or: [{ userID: user._id }, { userID: null }] })
      .toArray();

    return recipes;
  },
  getRecipe: async (_, { recipeID }, { db, user }) => {
    // check if user is logged
    if (!user) {
      throw new Er("Authentication Error: Please Sign In");
    }

    const recipe = await db
      .collection(ENV.DB_RECIP_COL)
      .findOne({ _id: new ObjectId(recipeID)});

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return recipe;
  },
};

export { CatalogueQueries };
