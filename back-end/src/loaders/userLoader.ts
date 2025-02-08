import { Db, ObjectId } from "mongodb";
import { ENV } from "../config/env.js";

import DataLoader from "dataloader";
import { DbUser } from "types/User.js";

const createUserLoader = (db: Db): DataLoader<ObjectId, DbUser, string> => {
  return new DataLoader(async (userIDs) => {
    const query = { _id: { $in: userIDs } };

    const users = await db.collection(ENV.DB_USERS_COL).find(query).toArray() as DbUser[];

    const userMap = users.reduce((map: Record<string, DbUser>, user: DbUser) => {
      map[user._id.toString()] = user
      return map
    }, {})

    return userIDs.map(id => userMap[id.toString()])
  });
};

export { createUserLoader };
