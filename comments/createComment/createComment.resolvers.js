import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, content }, { loggedInUser }) => {
        const res = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });
        if (!res) {
          return {
            ok: false,
            error: "Photo not Found.",
          };
        } else {
          const newComment = await client.comment.create({
            data: {
              content,
              photo: {
                connect: { id: photoId },
              },
              user: {
                connect: { id: loggedInUser.id },
              },
            },
          });
          return {
            ok: true,
            id: newComment.id,
          };
        }
      }
    ),
  },
};
