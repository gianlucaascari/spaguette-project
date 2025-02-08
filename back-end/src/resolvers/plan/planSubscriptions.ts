import { ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";
import { subscribe } from "diagnostics_channel";
import { withFilter } from "graphql-subscriptions";

const planSubscriptions = {
  listenAddRequests: {
    subscribe: withFilter(
      (_, __, { user, pubsub }) => {
        // check if user is logged
        if (!user) {
          throw new Error("Authentication Error: Please Sign In");
        }

        return pubsub.asyncIterator(["ADD_REQUESTS"]);
      },
      ({ toUser }, _, { user }) => {
        return toUser === user._id.toString();
      }
    ),
    resolve: ({ recAddRequest }) => {
      return recAddRequest;
    },
  },
  listenAnswerAddRequests: {
    subscribe: withFilter(
      (_, __, { user, pubsub }) => {
        // check if user is logged
        if (!user) {
          throw new Error("Authentication Error: Please Sign In");
        }

        return pubsub.asyncIterator(["ANS_ADD_REQUESTS"]);
      },
      ({ ansUser }, { userID }) => {
        return ansUser === userID;
      }
    ),
    resolve: ({ addRequest }) => {
      return addRequest;
    },
  },
  listenUpdPlan: {
    subscribe: withFilter(
      (_, __, { user, pubsub }) => {
        // check if user is logged
        if (!user) {
          throw new Error("Authentication Error: Please Sign In");
        }

        return pubsub.asyncIterator(["UPDATE_PLAN"]);
      },
      ({ updatedUser, updatingUser }, { userID }, { user }) => {
          return updatingUser !== user._id.toString() && updatedUser === userID;
      }
    ),
    resolve: ({ plan }) => {
      return plan;
    },
  },
};

export { planSubscriptions };
