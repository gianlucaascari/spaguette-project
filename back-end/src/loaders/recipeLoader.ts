import { Db, ObjectId } from "mongodb";
import { ENV } from "../config/env.js";

import DataLoader from "dataloader";
import { DbRecipe } from "types/Catalogue.js";

const createRecipeLoader = (db: Db): DataLoader<ObjectId, DbRecipe, string> => {
  return new DataLoader(async (recipeIDs) => {
    const query = { _id: { $in: recipeIDs } };

    const recipes = await db.collection(ENV.DB_RECIP_COL).find(query).toArray() as DbRecipe[];

    const recipeMap = recipes.reduce((map: Record<string, DbRecipe>, recipe: DbRecipe) => {
      map[recipe._id.toString()] = recipe
      return map
    }, {})

    return recipeIDs.map(id => recipeMap[id.toString()])
  });
};

export { createRecipeLoader };
