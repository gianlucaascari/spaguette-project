import { ENV } from "../../config/env.js";
import bcrypt from "bcryptjs";
import { getToken } from "../../util/jwt.js";
import { ObjectId } from "mongodb";

const UserMutations = {
  // allows new users to register
  signUp: async (_, { name, email, password }, { db }) => {
    // checks if the user is already registered
    const user = await db
      .collection(ENV.DB_USERS_COL)
      .findOne({ email: email });
    if (user) {
      throw new Error("Already used email");
    }

    // hashes the password and creates the new user
    const hashedPw = bcrypt.hashSync(password);
    const newUser = {
      name: name,
      email: email,
      password: hashedPw,
      plan: {
        recipes: []
      },
      list: {
        recipes: [],
        ingredients: [],
      },
    };

    // adds the new user
    const result = await db.collection(ENV.DB_USERS_COL).insertOne(newUser);

    newUser.id = result.insertedId;

    // creates and return token of authorization
    const token = getToken(newUser);
    return {
      user: newUser,
      token: token,
    };
  },
  // allows users to access
  signIn: async (_, { email, password }, { db }) => {
    // checks if user is registered
    const user = await db
      .collection(ENV.DB_USERS_COL)
      .findOne({ email: email });
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
  sendFriendshipRequest: async (_, { userID }, { db, user }) => {
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
    });

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

    const friendship = {
      senderID: user._id,
      receiverID: new ObjectId(userID),
      status: 0,
      date: Date.now(),
    };

    const res = await db.collection(ENV.DB_FRIEN_COL).insertOne(friendship);

    return 1;
  },
  answerFriendshipRequest: async (_, { userID, mode }, { db, user }) => {

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
