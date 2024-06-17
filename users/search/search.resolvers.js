import client from "../../client.js";

export default {
  Query: {
    searchUser: async (_, { keyword, page }) => {
      if (keyword.length <= 3) {
        return {
          ok: false,
          error: "Keyword must be longer than 3 characters.",
        };
      }

      const users = await client.user.findMany({
        where: {
          OR: [
            { username: { contains: keyword } },
            { username: { startsWith: keyword } },
          ],
        },
        mode: "insensitive", // 대소문자 구별하지 않음
        take: 4,
        skip: (page - 1) * 4,
      });

      const totalUsers = await client.user.count({
        where: {
          OR: [
            { username: { contains: keyword } },
            { username: { startsWith: keyword } },
          ],
        },
        mode: "insensitive",
      });
      return {
        ok: true,
        users,
        totalPage: Math.ceil(totalUsers / 4),
      };
    },
  },
};
