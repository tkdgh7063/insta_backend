import jwt from "jsonwebtoken";
import client from "../client.js";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const loggedInUser = await client.user.findUnique({ where: { id } });
    if (loggedInUser) {
      return loggedInUser;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

// export const protectedResolver = (resolver) => (root, args, context, info) => {
//   if (!context.loggedInUser) {
//     return {
//       ok: false,
//       error: "You are not logged in.",
//     };
//   }
//   return resolver(root, args, context, info);
// };

export function protectedResolver(resolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const isQuery = info.operation.operation === "query";
      if (isQuery) {
        return null;
      } else {
        return {
          ok: false,
          error: "You are not logged in.",
        };
      }
    }
    return resolver(root, args, context, info);
  };
}
