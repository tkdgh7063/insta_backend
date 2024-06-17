import client from "../../client.js";

export default {
  Query: {
    seePhotoComments: (_, { id }, { loggedInUser }) =>
      // need test
      // 사진의 댓글 보여주기
      // id, lastId
      client.comment.findMany({
        where: { photoId: id },
        // take: 4,
        // skip: lastId ? 1 : 0,
        // ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: "asc" },
      }),
  },
};
