import { ENV } from "../../config/env.js";
import bcrypt from "bcryptjs";
import { getToken } from "../../util/jwt.js";
import { ObjectId } from "mongodb";
import { DbAuthUser, DbFriendship, DbFriendshipInput, DbUser, DbUserInput, SignInInput, SignUpInput } from "types/User.js";
import { Context } from "types/General.js";

const UserMutations = {
  // allows new users to register
  signUp: async (
    _: unknown, 
    { input }: { input: SignUpInput }, 
    { db }: Context
  ): Promise<DbAuthUser> => {

    const { name, email: inputEmail, password } = input;
    const email = inputEmail.toLowerCase()

    // checks if the user is already registered
    const oldUser: DbUser | null = await db
      .collection(ENV.DB_USERS_COL)
      .findOne({ email: email }) as DbUser | null;

    if (oldUser) throw new Error("Already used email");

    // hashes the password and creates the new user
    const hashedPw = bcrypt.hashSync(password);
    const newUser: DbUserInput = {
      name: name,
      email: email,
      password: hashedPw,
      plan: { recipes: [] },
      list: { items: [] },
      addRequests: [],
    };

    // adds the new user
    const result = await db.collection(ENV.DB_USERS_COL).insertOne(newUser);

    const user: DbUser = {
      ...newUser,
      _id: result.insertedId
    }

    // creates and return token of authorization
    const token = getToken(user);
    return {
      user: user,
      token: token,
    };
  },
  // allows users to access
  signIn: async (
    _: unknown, 
    { input }: { input: SignInInput }, 
    { db }: Context
  ): Promise<DbAuthUser> => {
    
    const { email: inputEmail, password } = input
    const email = inputEmail.toLowerCase()

    // checks if user is registered
    const user = await db
      .collection(ENV.DB_USERS_COL)
      .findOne({ email: email }) as DbUser | null;
    if (!user) {
      throw new Error("Incorrect credientials");
    }

    // checks if password is correct
    const isPwCor = bcrypt.compareSync(password, user.password);
    if (!isPwCor) {
      throw new Error("Incorrect credientials");
    }

    // creates and return token of authorization
    const token = getToken(user);
    return {
      user: user,
      token: token,
    };
  },
  sendFriendshipRequest: async (
    _: unknown, 
    { userID }: { userID: string }, 
    { db, user }: Context
  ): Promise<number> => {
    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    // check not send to him self
    if (user._id.toString() == userID) {
      throw new Error("Impossible sending friendship request to yourself");
    }

    // check entry is not already present
    const oldFriendship = await db.collection(ENV.DB_FRIEN_COL).findOne({
      $or: [
        { senderID: user._id, receiverID: new ObjectId(userID) },
        { senderID: new ObjectId(userID), receiverID: user._id },
      ],
    }) as DbFriendship | null;

    if (oldFriendship) {
      // if a request has already been sent send an error
      if (oldFriendship.receiverID.toString() == userID) {
        throw new Error("Request already sent!");
      } 
      // if a request incoming is already present set friendship to enstablished
      else {
        const filter = {
          senderID: new ObjectId(userID),
          receiverID: user._id,
        };

        const update = {
          $set: {
            status: 1,
            date: Date.now(),
          },
        };

        const res = await db
          .collection(ENV.DB_FRIEN_COL)
          .updateOne(filter, update);

        if (res.matchedCount == 1) {
          return 3;
        }
      }
    }

    const friendship: DbFriendshipInput = {
      senderID: user._id,
      receiverID: new ObjectId(userID),
      status: 0,
      date: Date.now(),
    };

    const res = await db.collection(ENV.DB_FRIEN_COL).insertOne(friendship);
    if (!res.insertedId) throw new Error("Error adding friendship request");

    return 1;
  },
  answerFriendshipRequest: async (
    _: unknown, 
    { userID, mode }: { userID:string, mode:number }, 
    { db, user }: Context
  ): Promise<number> => {

    if (!user) {
      throw new Error("Authentication Error: Please Sign In");
    }

    // refuse
    if (mode === 0) {
      // delete entry from db
      const res = await db.collection(ENV.DB_FRIEN_COL).deleteOne({
        $or: [
          {
            receiverID: new ObjectId(user._id),
            senderID: new ObjectId(userID),
          },
          {
            receiverID: new ObjectId(userID),
            senderID: new ObjectId(user._id),
          },
        ],
      });

      if (res.deletedCount === 1) {
        return 0;
      }
    } 
    // accept
    else if (mode === 1) {
      // cambia status a 1
      const filter = {
        receiverID: new ObjectId(user._id),
        senderID: new ObjectId(userID),
      };

      const update = {
        $set: {
          status: 1,
          date: Date.now(),
        },
      };

      const res = await db
        .collection(ENV.DB_FRIEN_COL)
        .updateOne(filter, update);
      if (res.matchedCount == 1) {
        return 3;
      }
    } else {
      throw new Error("Non valid answer mode");
    }

    throw Error("Impossible performing the requested action");
  },
};

export { UserMutations };
