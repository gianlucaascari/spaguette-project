import { ENV } from "../config/env.js";

import DataLoader from "dataloader";

const createUserLoader = (db) => {
  return new DataLoader(async (userIDs) => {
    const query = { _id: { $in: userIDs } };

    const users = await db.collection(ENV.DB_USERS_COL).find(query).toArray();

    const userMap = users.reduce((map, user) => {
      map[user._id.toString()] = user
      return map
    }, {})

    return userIDs.map(id => userMap[id.toString()])
  });
};

export { createUserLoader };
