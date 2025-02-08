import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { getUserFromJWT } from "./util/jwt.js";

import { loadFiles } from "graphql-import-files";

import { connectDB, getDb } from "./config/db.js";

import { UserQueries } from "./resolvers/user/userQueries.js";
import { UserMutations } from "./resolvers/user/userMutations.js";
import { UserResolvers } from "./resolvers/user/userResolvers.js";

import { CatalogueQueries } from "./resolvers/catalogue/catalogueQueries.js";
import { CatalogueMutations } from "./resolvers/catalogue/catalogueMutations.js";
import { CatalogueResolvers } from "./resolvers/catalogue/catalogueResolvers.js";

import { PlanQueries } from "./resolvers/plan/planQueries.js";
import { PlanMutations } from "./resolvers/plan/planMutations.js";
import { PlanResolvers } from "./resolvers/plan/planResolvers.js";
import { planSubscriptions } from "./resolvers/plan/planSubscriptions.js";

import { createFriendshipLoader } from "./loaders/friendshipLoader.js";
import { createUserLoader } from "./loaders/userLoader.js";
import { createRecipeLoader } from "./loaders/recipeLoader.js";
import { createIngredientLoader } from "./loaders/ingredientLoader.js";

import { PubSub } from "graphql-subscriptions";
import { Context } from "types/General.js";

// Resolvers define how to fetch the types defined in the schema.
const resolvers = {
  Query: {
    ...CatalogueQueries,
    ...UserQueries,
    ...PlanQueries,
  },
  Mutation: {
    ...UserMutations,
    ...CatalogueMutations,
    ...PlanMutations,
  },
  Subscription: {
    ...planSubscriptions,
  },
  ...UserResolvers,
  ...CatalogueResolvers,
  ...PlanResolvers,
};

const pubsub = new PubSub();

await connectDB();
const db = getDb();

const schema = makeExecutableSchema({
  typeDefs: loadFiles("src/schema/*.graphql"),
  resolvers,
});

const app = express();

const httpServer = http.createServer(app);
const wsServer: WebSocketServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions",
});

const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => {
      const user = ctx.connectionParams ? await getUserFromJWT(ctx.connectionParams.authorization as string, db) : undefined;
      const context: Context = {
        db,
        user,
        friendshipLoader: createFriendshipLoader(db, user),
        userLoader: createUserLoader(db),
        recipeLoader: createRecipeLoader(db),
        ingredientLoader: createIngredientLoader(db),
        pubsub: pubsub,
      }
      return context;
    },
  },
  wsServer
);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const user = req.headers.authorization ? await getUserFromJWT(req.headers.authorization, db) : undefined;
      const context: Context = {
        db,
        user,
        friendshipLoader: createFriendshipLoader(db, user),
        userLoader: createUserLoader(db),
        recipeLoader: createRecipeLoader(db),
        ingredientLoader: createIngredientLoader(db),
        pubsub: pubsub,
      }
      return context;
    },
  })
);

const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
