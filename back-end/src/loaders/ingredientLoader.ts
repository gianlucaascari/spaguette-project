import { ENV } from "../config/env.js";

import DataLoader from "dataloader";

const createIngredientLoader = (db) => {
  return new DataLoader(async (ingredientIDs) => {
    const query = { _id: { $in: ingredientIDs } };

    const ingredients = await db.collection(ENV.DB_INGRE_COL).find(query).toArray();

    const ingredientMap = ingredients.reduce((map, ingredient) => {
      map[ingredient._id.toString()] = ingredient
      return map
    }, {})

    return ingredientIDs.map(id => ingredientMap[id.toString()])
  });
};

export { createIngredientLoader };
