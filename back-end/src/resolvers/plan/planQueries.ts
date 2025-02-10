import { Db, ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";
import { Context } from "types/General.js";
import { DbAddRequest, DbList, DbListItem, DbPlan, DbRecipeQuantity } from "types/Plan.js";
import { DbRecipe } from "types/Catalogue.js";

const PlanQueries = {
  getMyPlan: (_: unknown, __: unknown, { user }: Context): DbPlan => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    return user.plan || { recipes: [] };
  },
  getMyList: async (_: unknown, __: unknown, { user, db }: Context): Promise<DbList> => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const items = await createList(db, user.plan.recipes, user.list.items)
    return { items };
  },
  getMyAddRequests: (_: unknown, __: unknown, { user }: Context): DbAddRequest[] => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    return user.addRequests || [];
  },
};

export { PlanQueries };

const createList = async (db: Db, recipes: DbRecipeQuantity[], oldList: DbListItem[]): Promise<DbListItem[]> => {

  // ricavo tutte le ricette complete
  const recipeIDs = recipes.map((rec) => rec.recipeID);

  const resRec = await db
    .collection(ENV.DB_RECIP_COL)
    .find({ _id: { $in: recipeIDs } })
    .toArray() as DbRecipe[];

  const resRecipes = recipes.map((rec) => {
    const recipe = resRec.find(
      (resRecipe) => resRecipe._id.toString() == rec.recipeID.toString()
    );
    return {
      recipe: recipe as DbRecipe,
      numTimes: rec.numTimes,
      ...(rec.userID ? { userID: rec.userID } : {}),
    };
  });

  // costruisco l'array lista
  const newList: DbListItem[] = [];

  resRecipes.map((rec) => {
    rec.recipe.ingredients.map((ing) => {
      const index = newList.findIndex(
        (item) => ing.ingredientID.toString() === item.ingredientID.toString()
      );

      if (index !== -1) {
        newList[index].quantity += ing.quantity * rec.numTimes;
      } else {
        newList.push({
          ingredientID: ing.ingredientID,
          userID: rec.userID,
          quantity: ing.quantity * rec.numTimes,
          taken: false,
        });
      }
    });
  });


  if(oldList === undefined) {
    return newList;
  }

  const list = newList.map((item) => {
    const oldItem = oldList.find(
      (oldIt) => oldIt.ingredientID === item.ingredientID
    );

    // if the old items quantity was more than the new one keep the old taken
    return {
      ...item,
      taken: oldItem && oldItem.quantity >= item.quantity ? oldItem.taken : false
    }
  });

  return list;
};
