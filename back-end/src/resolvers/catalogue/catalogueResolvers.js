import { ObjectId } from "mongodb";

const CatalogueResolvers = {
  Ingredient: {
    id: ({ _id, id }) => _id || id,
    user: async ({ userID }, _, { userLoader }) => {
      return userID ? userLoader.load(new ObjectId(userID)) : null;
    },
  },
  Recipe: {
    id: ({ _id, id }) => _id || id,
    user: async ({ userID }, _, { userLoader }) => {
      return userID ? userLoader.load(new ObjectId(userID)) : null;
    },
  },
  IngredientQuantity: {
    ingredient: async ({ ingredientID }, _, { ingredientLoader }) => {
      return ingredientLoader.load(new ObjectId(ingredientID))
    }
  }
};

export { CatalogueResolvers };
