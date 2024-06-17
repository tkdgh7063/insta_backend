import client from "../client.js";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
    likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    comments: ({ id }) =>
      client.comment.findMany({
        where: { photoId: id },
        include: { user: true },
      }),
    commentsNum: ({ id }) => client.comment.count({ where: { photoId: id } }),
    isOwn: ({ userId }, _, { loggedInUser }) => userId === loggedInUser?.id,
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const res = await client.like.findUnique({
        where: {
          userId_photoId: {
            userId: loggedInUser.id,
            photoId: id,
          },
        },
        select: {
          id: true,
        },
      });

      if (res) {
        return true;
      } else {
        return false;
      }
    },
  },
  Hashtag: {
    photos: ({ id }, { page }, { loggedInUser }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
    },
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
