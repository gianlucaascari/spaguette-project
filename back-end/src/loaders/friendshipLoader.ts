import { Db } from "mongodb";
import { ENV } from "../config/env.js";

import DataLoader from "dataloader";
import { DbFriendship, DbUser } from "types/User.js";

const createFriendshipLoader = (
  db: Db, 
  user: DbUser | undefined
): DataLoader<string, DbFriendship[], string> => {
  if(!user) throw new Error('Impossible loading friendships for unkown user')

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
      .toArray() as DbFriendship[];

    const friendshipsByUserId = userIDs.reduce((acc: Record<string, DbFriendship[]>, userID: string) => {
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
