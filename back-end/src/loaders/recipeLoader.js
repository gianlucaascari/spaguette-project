import { ENV } from "../config/env.js";

import DataLoader from "dataloader";

const createRecipeLoader = (db) => {
  return new DataLoader(async (recipeIDs) => {
    const query = { _id: { $in: recipeIDs } };

    const recipes = await db.collection(ENV.DB_RECIP_COL).find(query).toArray();

    const recipeMap = recipes.reduce((map, recipe) => {
      map[recipe._id.toString()] = recipe
      return map
    }, {})

    return recipeIDs.map(id => recipeMap[id.toString()])
  });
};

export { createRecipeLoader };
