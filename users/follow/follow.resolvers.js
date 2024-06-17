import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";

export default {
  Mutation: {
    follow: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const isExist = await client.user.findUnique({ where: { username } });
      if (!isExist) {
        return {
          ok: false,
          error: "Username to follow not Exist.",
        };
      }
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
