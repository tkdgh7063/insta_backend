import client from "../../client.js";

export default {
  Query: {
    checkFollowing: async (_, { username, last }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Username not Found",
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 4,
          skip: last ? 1 : 0,
          ...(last && { cursor: { id: last } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
