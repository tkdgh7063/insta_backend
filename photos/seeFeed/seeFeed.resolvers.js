import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    seeFeed: protectedResolver(async (_1, _2, { loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: { id: loggedInUser.id },
                },
              },
            },
            { userId: loggedInUser.id },
          ],
        },
        orderBy: { createdAt: "desc" },
        // take: 2,
        // skip: offset,
      })
    ),
  },
};
