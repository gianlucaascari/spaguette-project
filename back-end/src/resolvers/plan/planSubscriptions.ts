import { ObjectId } from "mongodb";
import { ENV } from "../../config/env.js";
import { subscribe } from "diagnostics_channel";
import { withFilter } from "graphql-subscriptions";
import { AnsweredAddRequest, NewAddRequest, PlanUpdate } from "types/Plan.js";
import { Context } from "types/General.js";

const planSubscriptions = {
  listenAddRequests: {
    subscribe: withFilter(
      (_: unknown, __: unknown, { user, pubsub }: Context) => {
        // check if user is logged
        if (!user) {
          throw new Error("Authentication Error: Please Sign In");
        }

        return pubsub.asyncIterator(["ADD_REQUESTS"]);
      },
      ({ toUser }: NewAddRequest, _: unknown, { user }: Context) => {
        return !!user && toUser === user._id.toString();
      }
    ),
    resolve: ({ recAddRequest }: NewAddRequest) => {
      return recAddRequest;
    },
  },
  listenAnswerAddRequests: {
    subscribe: withFilter(
      (_: unknown, __: unknown, { user, pubsub }: Context) => {
        // check if user is logged
        if (!user) {
          throw new Error("Authentication Error: Please Sign In");
        }

        return pubsub.asyncIterator(["ANS_ADD_REQUESTS"]);
      },
      ({ answeringUserID }: AnsweredAddRequest, { userID }: { userID: string}) => {
        return answeringUserID.toString() === userID;
      }
    ),
    resolve: ({ addRequest }: AnsweredAddRequest) => {
      return addRequest;
    },
  },
  listenUpdPlan: {
    subscribe: withFilter(
      (_: unknown, __: unknown, { user, pubsub }: Context) => {
        // check if user is logged
        if (!user) {
          throw new Error("Authentication Error: Please Sign In");
        }

        return pubsub.asyncIterator(["UPDATE_PLAN"]);
      },
      ({ updatedUserID, updatingUserID }: PlanUpdate, { userID }: { userID: string }, { user }: Context) => {
          return !!user && updatingUserID.toString() !== user._id.toString() && updatedUserID.toString() === userID;
      }
    ),
    resolve: ({ plan }: PlanUpdate) => {
      return plan;
    },
  },
};

export { planSubscriptions };
