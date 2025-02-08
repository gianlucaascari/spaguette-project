import { ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";
import { Context } from "types/General.js";
import { DbFriendship, DbOthUser, DbUser } from "types/User.js";

const UserQueries = {
  getUser: async (
    _: unknown, 
    { id }: { id:string}, 
    { db, user }: Context
  ): Promise<DbOthUser> => {

    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const dbUser = await db.collection(ENV.DB_USERS_COL).findOne({ _id: new ObjectId(id) }) as DbUser | null
    if (!dbUser) throw new Error('User not found')

    return { user: dbUser }
  },
  getUsers: async (
    _: unknown, 
    { searchString }: { searchString:string }, 
    { db, user }: Context
  ): Promise<DbOthUser[]> => {
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
      .toArray() as DbUser[];

    const res = dbRes.map((user) => ({ user }));
    return res;
  },
  getFriends: async (
    _: unknown, 
    __: unknown, 
    { db, user }: Context
  ): Promise<DbUser[]> => {
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
      .toArray() as DbFriendship[];

    const friendIDs = friendships.flatMap((friendship) =>
      friendship.senderID.toString() !== user._id.toString()
        ? friendship.senderID
        : friendship.receiverID
    );

    const users = await db
      .collection(ENV.DB_USERS_COL)
      .find({ _id: { $in: friendIDs } })
      .toArray() as DbUser[];

    return users;
  },
  getFriendRequests: async (
    _: unknown, 
    __: unknown, 
    { db, user }: Context
  ): Promise<DbOthUser[]> => {
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    const friendRequests = await db
      .collection(ENV.DB_FRIEN_COL)
      .find({ receiverID: user._id })
      .toArray() as DbFriendship[];

    const senderIDs = friendRequests.flatMap(req => req.senderID)
    const requestUsers = await db
      .collection(ENV.DB_USERS_COL)
      .find({ _id: { $in: senderIDs }})
      .toArray() as DbUser[]

    const result = requestUsers.map(us => ({ status: 2, user: us }))
    return result
  },
};

export { UserQueries };
