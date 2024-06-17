import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({ where: { id } });
      if (!photo) {
        return {
          ok: false,
          error: "Photo not Found.",
        };
      }

      const like = await client.like.findUnique({
        where: {
          userId_photoId: {
            userId: loggedInUser.id,
            photoId: id,
          },
        },
      });
      if (like) {
        await client.like.delete({
          where: {
            userId_photoId: {
              userId: loggedInUser.id,
              photoId: id,
            },
          },
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: { id: loggedInUser.id },
            },
            photo: {
              connect: { id: photo.id },
            },
          },
        });
      }

      return {
        ok: true,
      };
    }),
  },
};
