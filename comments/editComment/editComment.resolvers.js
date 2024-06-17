import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, comment }, { loggedInUser }) => {
        const oldComment = await client.comment.findUnique({
          where: { id },
        });

        if (!oldComment) {
          return {
            ok: false,
            error: "Comment not Found.",
          };
        } else if (oldComment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Permission denied.",
          };
        } else {
          await client.comment.update({
            where: { id },
            data: {
              comment,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
