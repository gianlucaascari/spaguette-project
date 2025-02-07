import { ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";

const PlanQueries = {
  getMyPlan: (_, __, { user }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    return user.plan || { recipes: [] };
  },
  getMyList: (_, __, { user, db }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const items = createList(db, user.plan.recipes, user.list.items)
    return { items: items };
  },
  getMyAddRequests: (_, __, { user }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    return user.addRequests || [];
  },
};

export { PlanQueries };

const createList = async (db, recipes, oldList) => {

  // ricavo tutte le ricette complete
  const recipeIDs = recipes.map((rec) => new ObjectId(rec.recipeID));

  const resRec = await db
    .collection(ENV.DB_RECIP_COL)
    .find({ _id: { $in: recipeIDs } })
    .toArray();

  const resRecipes = recipes.map((rec) => {
    const recipe = resRec.find(
      (resRecipe) => resRecipe._id.toString() == rec.recipeID
    );
    return {
      recipe: recipe,
      numTimes: rec.numTimes,
      ...(rec.userID ? { userID: rec.userID } : {}),
    };
  });

  // costruisco l'array lista
  const newList = [];

  resRecipes.map((rec) => {
    rec.recipe.ingredients.map((ing) => {
      const index = newList.findIndex(
        (item) => ing.ingredientID === item.ingredientID
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
      taken: oldItem.quantity >= item.quantity ? oldItem.taken : false
    }
  });

  return list;
};
