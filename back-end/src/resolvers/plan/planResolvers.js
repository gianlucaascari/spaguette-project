import { ObjectId } from "mongodb";

const PlanResolvers = {
  RecipeQuantity: {
    user: async ({ userID }, _, { userLoader }) => {
      return userID ? userLoader.load(new ObjectId(userID)) : null;
    },
    recipe: async (parent, _, { recipeLoader }) => {
      return parent.recipeID ? recipeLoader.load(new ObjectId(parent.recipeID)) : parent.recipe;
    },
  },
  ListItem: {
    ingredient: async ({ ingredientID }, _, { ingredientLoader }) => {
      return ingredientLoader.load(new ObjectId(ingredientID));
    },
    user: async ({ userID }, _, { userLoader }) => {
      return userID ? userLoader.load(new ObjectId(userID)) : null;
    },
  },
  AddRequest: {
    user: async ({ userID }, _, { userLoader }) => {
      return userLoader.load(new ObjectId(userID));
    },
    recipe: async ({ recipeID }, _, { recipeLoader }) => {
      return recipeLoader.load(new ObjectId(recipeID));
    },
  },
};

export { PlanResolvers };
