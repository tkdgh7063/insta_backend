import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema.js";
import { getUser, protectedResolver } from "./users/users.utils.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginDrainHttpServer,
} from "apollo-server-core";
import express from "express";
import logger from "morgan";
import pubsub from "./pubsub.js";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import e from "express";
import { execute, subscribe } from "graphql";

const PORT = process.env.PORT;

async function startServer() {
  const app = express();

  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer(
    {
      schema,
      execute,
      subscribe,
      context: async ({ connectionParams }) => {
        if (connectionParams.token) {
          return {
            loggedInUser: await getUser(connectionParams.token),
          };
          //context에서 접근 가능
        } else {
          throw new Error("No Authentication.");
        }
      },
      onConnect: async ({ connectionParams }) => {
        //console.log(connectionParams.token);
        if (!connectionParams.token) {
          throw new Error("No Authentication");
        } else {
          const loggedInUser = await getUser(connectionParams.token);
          return { loggedInUser };
        }
      },
      onDisconnect: (context) => {
        //console.log("onDisconnect");
      },
    },
    wsServer
  );

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
      if (ctx.req) {
        return {
          loggedInUser: await getUser(ctx.req.headers.token),
          //protectedResolver,
        };
      } else {
        const {
          connection: { context },
        } = ctx;
        return {
          loggedInUser: context.loggedInUser,
        };
      }
    },
    // Using graphql-upload without CSRF prevention is very insecure.
    //csrfPrevention: false,
    //cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              //await subscriptionServer.close();
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await apollo.start();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));
  apollo.applyMiddleware({ app, path: "/" });

  // await new Promise((r) => app.listen({ port: 4000 }, r));
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
    );
  });
}

startServer();

// await app.start();

// const app = express();
// app.use(GraphQLUploadExpress());
// server.applyMiddleware({ app });

// server.start().then((res) => {
//   server.applyMiddleware({ app, path: "/" });
// });

// await new Promise((func) => app.listen({ port: PORT }, func));
// console.log(`🚀 Server ready at http://localhost:${PORT}`);

// startServer();

// const { url } = await startStandaloneServer(server);
// console.log(`🚀 Server ready at ${url}`);
// server
//   .listen()
//   .then(() => console.log(`🚀 Server ready at http://localhost:${PORT}`));
