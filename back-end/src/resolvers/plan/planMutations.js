import { ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";

const PlanMutations = {
  updPlan: async (_, { input }, { db, user, pubsub }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const { recipes } = input;
    const plan = { recipes: recipes };

    await db
      .collection(ENV.DB_USERS_COL)
      .updateOne({ _id: user._id }, { $set: { plan: plan } });

    pubsub.publish("UPDATE_PLAN", {
      updatingUser: user._id.toString(),
      updatedUser: user._id.toString(),
      plan: plan,
    });

    return plan;
  },
  updList: async (_, { input }, { db, user }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    await db
      .collection(ENV.DB_USERS_COL)
      .updateOne({ _id: user._id }, { $set: { list: input } });

    return input;
  },
  addRequest: async (_, { userID, recipe }, { db, user, pubsub }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const addRequest = {
      userID: user._id,
      recipeID: new ObjectId(recipe.recipeID),
      numTimes: recipe.numTimes,
    };

    pubsub.publish("ADD_REQUESTS", {
      toUser: userID,
      recAddRequest: { addRequest: addRequest, addMode: true },
    });

    // update existing request
    const filterUpdate = {
      _id: new ObjectId(userID),
      "addRequests.userID": user._id,
      "addRequests.recipeID": new ObjectId(recipe.recipeID),
    };

    const updateExisting = {
      $set: {
        "addRequests.$.numTimes": recipe.numTimes,
      },
    };

    const resUpdate = await db
      .collection(ENV.DB_USERS_COL)
      .updateOne(filterUpdate, updateExisting);

    // add request if not present
    if (resUpdate.matchedCount === 0) {
      const filterAdd = {
        _id: new ObjectId(userID),
      };

      const updateAdd = {
        $push: { addRequests: addRequest },
      };

      await db
        .collection(ENV.DB_USERS_COL)
        .updateOne(filterAdd, updateAdd, { upsert: true });
    }

    return addRequest;
  },
  answerAddRequest: async (
    _,
    { userID, recipeID, mode },
    { db, user, pubsub }
  ) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    // eliminare la richiesta (controlla effettivamente se c'era)
    const filterDel = {
      _id: user._id,
      "addRequests.recipeID": new ObjectId(recipeID),
      "addRequests.userID": new ObjectId(userID),
    };

    const updateDel = {
      $pull: {
        addRequests: {
          recipeID: new ObjectId(recipeID),
          userID: new ObjectId(userID),
        },
      },
    };

    const res = await db
      .collection(ENV.DB_USERS_COL)
      .findOneAndUpdate(filterDel, updateDel);

    if (!res) {
      throw new Error("Add request not found");
    }

    const request = res.addRequests.find(
      (req) =>
        req.userID.toString() === userID && req.recipeID.toString() === recipeID
    );

    pubsub.publish("ANS_ADD_REQUESTS", {
      ansUser: user._id.toString(),
      addRequest: { recipeID, userID, numTimes: 0 },
    });

    // se mode = 1, aggiungi al piano
    if (mode === 1) {
      const recipes = user.plan.recipes;

      const recipeIndex = recipes.findIndex(
        (recipe) => recipe.recipeID === recipeID
      );
      if (recipeIndex !== -1) {
        // Se la ricetta esiste già, aggiornala
        recipes[recipeIndex] = {
          recipeID: recipeID,
          userID: userID,
          numTimes: request.numTimes,
        };
      } else {
        // Se la ricetta non esiste, aggiungila
        recipes.push({
          recipeID: recipeID,
          userID: userID,
          numTimes: request.numTimes,
        });
      }

      const updPlan = { recipes: recipes };

      pubsub.publish("UPDATE_PLAN", {
        updatingUser: user._id.toString(),
        updatedUser: user._id.toString(),
        plan: updPlan,
      });

      await db
        .collection(ENV.DB_USERS_COL)
        .updateOne(
          { _id: new ObjectId(user._id) },
          { $set: { plan: updPlan } }
        );

      // restituisci il nuovo piano
      return updPlan;
    }
    // se mode = 0, non fare nulla
    else {
      // restituisci il vecchio piano
      return user.plan;
    }
  },
  remAppRequest: async (_, { userID, recipeID }, { db, user, pubsub }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const filterDel = {
      _id: new ObjectId(userID),
      "plan.recipes.recipeID": recipeID,
      "plan.recipes.userID": user._id.toString(),
    };

    const updateDel = {
      $pull: {
        "plan.recipes": {
          recipeID: recipeID,
          userID: user._id.toString(),
        },
      },
    };

    const res = await db
      .collection(ENV.DB_USERS_COL)
      .findOneAndUpdate(filterDel, updateDel, { returnDocument: "after" });

    pubsub.publish("UPDATE_PLAN", {
      updatingUser: user._id.toString(),
      updatedUser: userID,
      plan: res.plan,
    });

    return recipeID;
  },
  remPenRequest: async (_, { userID, recipeID }, { db, user, pubsub }) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const filterDel = {
      _id: new ObjectId(userID),
      "addRequests.recipeID": new ObjectId(recipeID),
      "addRequests.userID": user._id,
    };

    const updateDel = {
      $pull: {
        addRequests: {
          recipeID: new ObjectId(recipeID),
          userID: user._id,
        },
      },
    };

    await db
      .collection(ENV.DB_USERS_COL)
      .updateOne(filterDel, updateDel, { returnDocument: "after" });

    pubsub.publish("ADD_REQUESTS", {
      toUser: userID,
      recAddRequest: {
        addRequest: {
          userID: user._id,
          recipeID: new ObjectId(recipeID),
          numTimes: 0,
        },
        addMode: false,
      },
    });

    return recipeID;
  },
};

export { PlanMutations };
