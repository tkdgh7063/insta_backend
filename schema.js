import path from "path";
import url from "url";
import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ** for any folder, * for any file
const loadedTypeDefs = await loadFiles(`${__dirname}/**/*.typeDefs.js`, {
  ignoreIndex: true,
  requireMethod: async (path) => {
    return await import(url.pathToFileURL(path));
  },
});
const resolversArray = await loadFiles(`${__dirname}/**/*.resolvers.js`, {
  ignoreIndex: true,
  requireMethod: async (path) => {
    return await import(url.pathToFileURL(path));
  },
});

export const typeDefs = mergeTypeDefs(loadedTypeDefs);
export const resolvers = mergeResolvers(resolversArray);
