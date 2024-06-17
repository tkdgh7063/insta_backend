import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";
import { parseHashtags } from "../photos.utils.js";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        const res = await client.photo
          .findUnique({
            where: {
              id,
              userId: loggedInUser.id,
            },
            select: { hashtags: true },
          })
          .hashtags({ select: { hashtag: true } });
        if (!res) {
          return {
            ok: false,
            error: "Photo not Found.",
          };
        }
        await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: [res.hashtags],
              connectOrCreate: parseHashtags(caption),
            },
          },
        });
      }
    ),
  },
};
