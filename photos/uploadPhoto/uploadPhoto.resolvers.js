import client from "../../client.js";
import { uploadAWS } from "../../common/common.utils.js";
import { protectedResolver } from "../../users/users.utils.js";
import { parseHashtags } from "../photos.utils.js";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          parseHashtags(caption);
        }
        const url = await uploadAWS(loggedInUser.id, "uploads", file);
        return await client.photo.create({
          data: {
            file: url,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
      }
    ),
  },
};
