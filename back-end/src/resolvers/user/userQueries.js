import { ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";

const UserQueries = {
  getUser: async (_, { id }, { db, user }) => {

    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const dbUser = await db.collection(ENV.DB_USERS_COL).findOne({ _id: new ObjectId(id) })

    return { user: dbUser }
  },
  getUsers: async (_, { searchString }, { db, user }) => {
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const agg = [
      {
        $match: {
          $and: [
            { _id: { $ne: user._id } },
            {
              $or: [
                { name: { $regex: searchString, $options: "i" } },
                { email: { $regex: searchString, $options: "i" } },
              ],
            },
          ],
        },
      },
      {
        $limit: 8,
      },
    ];

    const dbRes = await db
      .collection(ENV.DB_USERS_COL)
      .aggregate(agg)
      .toArray();

    const res = dbRes.map((user) => ({ user }));
    return res;
  },
  getFriends: async (_, __, { db, user }) => {
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const friendships = await db
      .collection(ENV.DB_FRIEN_COL)
      .find({
        $and: [
          {
            $or: [{ senderID: user._id }, { receiverID: user._id }],
          },
          {
            status: 1,
          },
        ],
      })
      .toArray();

    const friendIDs = friendships.flatMap((friendship) =>
      friendship.senderID.toString() !== user._id.toString()
        ? friendship.senderID
        : friendship.receiverID
    );

    const users = await db
      .collection(ENV.DB_USERS_COL)
      .find({ _id: { $in: friendIDs } })
      .toArray();

    return users;
  },
  getFriendRequests: async (_, __, { db, user }) => {
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const friendRequests = await db
      .collection(ENV.DB_FRIEN_COL)
      .find({ receiverID: user._id })
      .toArray();

    const senderIDs = friendRequests.flatMap(req => req.senderID)

    // console.log(senderIDs)

    const requestUsers = await db.collection(ENV.DB_USERS_COL).find({ _id: { $in: senderIDs }}).toArray()

    const result = requestUsers.map(us => ({ status: 2, user: us }))
    // console.log(result)

    return result
  },
};

export { UserQueries };
