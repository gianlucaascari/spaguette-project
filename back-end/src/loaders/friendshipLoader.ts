import { ENV } from "../config/env.js";

import DataLoader from "dataloader";

const createFriendshipLoader = (db, user) => {
  return new DataLoader(async (userIDs) => {
    const query = {
      $and: [
        {
          $or: [
            { senderID: user._id},
            { receiverID: user._id}
          ]
        },
        {
          $or: userIDs.flatMap((userId) => [
            { senderID: userId },
            { receiverID: userId },
          ]),

        }
      ]
    };

    const friendships = await db
      .collection(ENV.DB_FRIEN_COL)
      .find(query)
      .toArray();

    const friendshipsByUserId = userIDs.reduce((acc, userID) => {
      acc[userID] = friendships.filter(
        (friendship) =>
          friendship.senderID.toString() === userID.toString() ||
          friendship.receiverID.toString() === userID.toString()
      );
      return acc;
    }, {});

    return userIDs.map((userId) => friendshipsByUserId[userId] || []);
  });
};

export { createFriendshipLoader }
