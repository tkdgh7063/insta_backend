import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";

export default {
  Mutation: {
    unfollow: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({
        where: { username },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Username to unfollow not Exist",
        };
      }
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            disconnect: {
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
