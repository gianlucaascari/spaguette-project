import { ObjectId } from "mongodb";
import { Context } from "types/General.js";
import { DbOthUser, DbUser } from "types/User.js";

const UserResolvers = {
  User: {
    id: ({ _id }: DbUser) => _id.toString(),
    plan: (parent: DbUser) => {       // ???
      return parent.plan
    }
  },
  OthUser: {
    status: async ({ user: otherUser, status }: DbOthUser, _:unknown, { friendshipLoader }:Context) => {
      if (status) {
        return status
      }

      const friendships = await friendshipLoader.load(otherUser._id.toString());

      const foundFr = friendships.find(
        (fr) =>
          fr.senderID.toString() == otherUser._id.toString() ||
          fr.receiverID.toString() == otherUser._id.toString()
      );

      let state = -1;
      if (!foundFr) {
        // se non la trovo status = 0
        state = 0;
      } else if (
        // se la trovo, lo status è 0 e l'altro utente è il receiver status = 1
        foundFr.status == 0 &&
        foundFr.receiverID.toString() == otherUser._id.toString()
      ) {
        state = 1;
      } else if (
        // se la trovo, lo status è 0 e l'altro utente è il sender status = 2
        foundFr.status == 0 &&
        foundFr.senderID.toString() == otherUser._id.toString()
      ) {
        state = 2;
      } else if (foundFr.status == 1) {
        // se la trovo e lo status è 1 -> status = 3
        state = 3;
      }

      return state;
    },
  },
};

export { UserResolvers };
