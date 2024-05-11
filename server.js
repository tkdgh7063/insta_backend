// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "apollo-server";
import schema from "./schema.js";

const server = new ApolloServer({
  schema,
});

const PORT = process.env.PORT;

// const { url } = await startStandaloneServer(server);
// console.log(`🚀 Server ready at ${url}`);
server
  .listen()
  .then(() => console.log(`🚀 Server ready at http://localhost:${PORT}`));
