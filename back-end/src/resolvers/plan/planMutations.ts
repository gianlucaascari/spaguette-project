import { ObjectId, Document } from "mongodb";
import { ENV } from "../../config/env.js";
import { AnsweredAddRequest, DbAddRequest, DbList, DbPlan, ListInput, NewAddRequest, PlanInput, PlanRecipeInput, PlanUpdate } from "types/Plan.js";
import { Context } from "types/General.js";
import { DbUser } from "types/User.js";

const PlanMutations = {
  updPlan: async (
    _: unknown, 
    { input }: { input: PlanInput }, 
    { db, user, pubsub }: Context
  ): Promise<DbPlan> => {
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
  updList: async (
    _: unknown, 
    { input }: { input: ListInput }, 
    { db, user }: Context
  ): Promise<DbList> => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    await db
      .collection(ENV.DB_USERS_COL)
      .updateOne({ _id: user._id }, { $set: { list: input } });

    return input;
  },
  addRequest: async (
    _: unknown, 
    { userID, recipe }: { userID: string, recipe: PlanRecipeInput }, 
    { db, user, pubsub }: Context) => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const addRequest: DbAddRequest = {
      userID: user._id,
      recipeID: new ObjectId(recipe.recipeID),
      numTimes: recipe.numTimes,
    };

    const message: NewAddRequest = {
      toUser: userID,
      recAddRequest: { addRequest: addRequest, addMode: true },
    }

    pubsub.publish("ADD_REQUESTS", message);

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

      const updateAdd: Document = {
        $push: { addRequests: addRequest },
      };

      await db
        .collection(ENV.DB_USERS_COL)
        .updateOne(filterAdd, updateAdd, { upsert: true });
    }

    return addRequest;
  },
  answerAddRequest: async (
    _: unknown,
    { userID, recipeID, mode }: { userID:string, recipeID:string, mode:number },
    { db, user, pubsub }: Context
  ): Promise<DbPlan> => {
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

    const updateDel: Document = {
      $pull: {
        addRequests: {
          recipeID: new ObjectId(recipeID),
          userID: new ObjectId(userID),
        },
      },
    };

    const res = await db
      .collection(ENV.DB_USERS_COL)
      .findOneAndUpdate(filterDel, updateDel) as DbUser | null;

    if (!res) {
      throw new Error("Add request not found");
    }

    const request = res.addRequests.find(
      (req) =>
        req.userID.toString() === userID && req.recipeID.toString() === recipeID
    ) as DbAddRequest;

    const message: AnsweredAddRequest = {
      answeringUserID: user._id,
      addRequest: { recipeID: new ObjectId(recipeID), userID: new ObjectId(userID), numTimes: 0 },
    }

    pubsub.publish("ANS_ADD_REQUESTS", message);

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

      const message: PlanUpdate = {
        updatingUserID: user._id,
        updatedUserID: user._id,     // shouldn't it be userID?
        plan: updPlan,
      }

      pubsub.publish("UPDATE_PLAN", message);

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
  remAppRequest: async (
    _: unknown, 
    { userID, recipeID }: { userID:string, recipeID:string }, 
    { db, user, pubsub }: Context
  ): Promise<ObjectId> => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const filterDel = {
      _id: new ObjectId(userID),
      "plan.recipes.recipeID": recipeID,
      "plan.recipes.userID": user._id.toString(),
    };

    const updateDel: Document = {
      $pull: {
        "plan.recipes": {
          recipeID: recipeID,
          userID: user._id.toString(),
        },
      },
    };

    const res = await db
      .collection(ENV.DB_USERS_COL)
      .findOneAndUpdate(filterDel, updateDel, { returnDocument: "after" }) as DbUser | null;

    if (!res) throw new Error('')

    pubsub.publish("UPDATE_PLAN", {
      updatingUser: user._id.toString(),
      updatedUser: userID,
      plan: res.plan,
    });

    return new ObjectId(recipeID);
  },
  remPenRequest: async (
    _: unknown, 
    { userID, recipeID }: { userID:string, recipeID:string }, 
    { db, user, pubsub }: Context
  ): Promise<ObjectId> => {
    // check if user is logged
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const filterDel = {
      _id: new ObjectId(userID),
      "addRequests.recipeID": new ObjectId(recipeID),
      "addRequests.userID": user._id,
    };

    const updateDel: Document = {
      $pull: {
        addRequests: {
          recipeID: new ObjectId(recipeID),
          userID: user._id,
        },
      },
    };

    await db
      .collection(ENV.DB_USERS_COL)
      .findOneAndUpdate(filterDel, updateDel, { returnDocument: "after" });

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

    return new ObjectId(recipeID);
  },
};

export { PlanMutations };
