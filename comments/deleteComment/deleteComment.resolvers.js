import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!comment) {
        return {
          ok: false,
          error: "Comment not Found.",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Permission denied",
        };
      } else {
        await client.comment.delete({
          where: { id },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
