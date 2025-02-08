import { Db, ObjectId } from "mongodb";
import { ENV } from "../config/env.js";

import DataLoader from "dataloader";
import { DbIngredient } from "types/Catalogue.js";

const createIngredientLoader = (db: Db): DataLoader<ObjectId, DbIngredient, string> => {
  return new DataLoader(async (ingredientIDs: readonly ObjectId[]) => {
    const query = { _id: { $in: ingredientIDs } };

    const ingredients = await db.collection(ENV.DB_INGRE_COL).find(query).toArray() as DbIngredient[];

    const ingredientMap = ingredients.reduce((map: Record<string, DbIngredient>, ingredient: DbIngredient) => {
      map[ingredient._id.toString()] = ingredient
      return map
    }, {})

    return ingredientIDs.map(id => ingredientMap[id.toString()])
  });
};

export { createIngredientLoader };
