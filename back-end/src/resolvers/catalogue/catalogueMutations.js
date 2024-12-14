import { ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";

const CatalogueMutations = {
  addIngredient: async (_, { name, unityOfMeasure }, { db, user }) => {

    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    // all ingredients equally formatted
    const ingName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const ingUnityOfMeasure = unityOfMeasure.toLowerCase();

    // checks if ingredient already exists
    const oldIngredient = await db
      .collection(ENV.DB_INGRE_COL)
      .findOne({ name: ingName, userID: new ObjectId(user._id) });
    if (oldIngredient) {
      throw new Error("Ingredient already existing");
    }

    // insert ingredient
    const ingredient = {
      userID: user._id,
      name: ingName,
      unityOfMeasure: ingUnityOfMeasure,
    };

    const res = await db.collection(ENV.DB_INGRE_COL).insertOne(ingredient);

    ingredient.id = res.insertedId;

    return ingredient;
  },
  updIngredient: async (_, { id, name, unityOfMeasure }, { db, user }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    // all ingredients equally formatted
    const ingName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const ingUnityOfMeasure = unityOfMeasure.toLowerCase();

    const filter = {
      _id: new ObjectId(id),
      userID: new ObjectId(user._id),
    };

    const update = {
      $set: {
        name: ingName,
        unityOfMeasure: ingUnityOfMeasure,
      },
    };

    const result = await db
      .collection(ENV.DB_INGRE_COL)
      .updateOne(filter, update);

    if (result && result.matchedCount == 1) {
      const res = await db
        .collection(ENV.DB_INGRE_COL)
        .findOne({ _id: new ObjectId(id) });
      return res;
    } else {
      throw new Error("Ingredient not found");
    }
  },
  remIngredient: async (_, { id }, { db, user }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    // controlla se l'ingrediente esite ed è dell'utente
    const ingredient = await db
      .collection(ENV.DB_INGRE_COL)
      .findOne({ _id: new ObjectId(id), userID: new ObjectId(user._id) });

    // controlla se l'ingrediente è usato
    const inUseRecipes = await db
      .collection(ENV.DB_RECIP_COL)
      .find({ "ingredients.ingredientID": id })
      .toArray();

    if (inUseRecipes.length > 0) {
      const recipes = inUseRecipes.map((rec) => rec.name).join(", ");
      throw new Error(
        "Ingredient can't be deleted, it is in use in the recipes: " + recipes
      );
    }

    // rimuovi l'ingrediente
    if (ingredient) {
      const delResult = await db
        .collection(ENV.DB_INGRE_COL)
        .deleteOne({ _id: new ObjectId(id) });

      if (delResult.deletedCount === 1) {
        return true;
      }
    }

    // restituisci il risultato
    return false;
  },
  addRecipe: async (_, { input }, { db, user }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const { name, description, stepsLink, ingredients } = input;

    // all recipes equally formatted
    const recName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    // checks if ingredient already exists
    const oldRecipe = await db
      .collection(ENV.DB_RECIP_COL)
      .findOne({ name: recName, userID: new ObjectId(user._id) });
    if (oldRecipe) {
      throw new Error("Recipe already existing");
    }

    const recipe = {
      userID: user._id,
      name: recName,
      description: description,
      stepsLink: stepsLink,
      ingredients: ingredients,
    };

    const res = await db.collection(ENV.DB_RECIP_COL).insertOne(recipe);

    recipe.id = res.insertedId;

    return recipe;
  },
  updRecipe: async (_, { id, input }, { db, user }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const { name, description, stepsLink, ingredients } = input;

    // all recipes equally formatted
    const recName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const filter = {
      _id: new ObjectId(id),
      userID: new ObjectId(user._id),
    };

    const update = {
      $set: {
        name: recName,
        description: description,
        stepsLink: stepsLink,
        ingredients: ingredients,
      },
    };

    const result = await db
      .collection(ENV.DB_RECIP_COL)
      .updateOne(filter, update);

    if (result && result.matchedCount == 1) {
      const res = await db
        .collection(ENV.DB_RECIP_COL)
        .findOne({ _id: new ObjectId(id) });

      return res;
    } else {
      throw new Error("Recipe not found");
    }
  },
  remRecipe: async (_, { id }, { db, user }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    // controlla se la ricetta esite ed è dell'utente
    const recipe = await db
      .collection(ENV.DB_RECIP_COL)
      .findOne({ _id: new ObjectId(id), userID: new ObjectId(user._id) });

    // elimina la ricetta dai piani in cui era presente
    const inUseUsers = await db
      .collection(ENV.DB_USERS_COL)
      .find({ "plan.recipes.recipeID": id })
      .toArray();

    if (inUseUsers.length > 0) {
      const users = inUseUsers.map((user) => user.name).join(", ");
      throw new Error(
        "You cannot delete this recipe, the following users are using it: " +
          users
      );
    }

    // rimuovi la ricetta
    if (recipe) {
      const delResult = await db
        .collection(ENV.DB_RECIP_COL)
        .deleteOne({ _id: new ObjectId(id) });

      if (delResult.deletedCount === 1) {
        return true;
      }
    }

    // restituisci il risultato
    return false;
  },
  utilRemRecipes: async (_, { subString }, { db }) => {
    const res = await db
      .collection(ENV.DB_RECIP_COL)
      .deleteMany({ name: { $regex: subString } });

    return res.deletedCount
  },
  utilRemIngredients: async (_, { subString }, { db }) => {
    const res = await db
      .collection(ENV.DB_INGRE_COL)
      .deleteMany({ name: { $regex: subString } });

    return res.deletedCount
  },
};

export { CatalogueMutations };
