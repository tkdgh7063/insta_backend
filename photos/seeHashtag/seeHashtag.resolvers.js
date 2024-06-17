import client from "../../client.js";

export default {
  Query: {
    seeHashtag: (_, { hashtag }) =>
      client.hashtag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
};
