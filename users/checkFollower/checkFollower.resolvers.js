import client from "../../client.js";

export default {
  Query: {
    checkFollower: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Username not Found.",
        };
      }
      const follower = await client.user
        .findUnique({ where: { username } })
        .followers({ take: 4, skip: (page - 1) * 4 });
      const totalFollower = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        ok: true,
        follower,
        totalPage: Math.ceil(totalFollower / 4),
      };
    },
  },
};
