import client from "../../client.js";

export default {
  Query: {
    searchPhotos: async (_, { keyword, page }) => {
      if (keyword.length <= 3) {
        return {
          ok: false,
          error: "Keyword must be longer than 3 characters.",
        };
      }

      const photos = client.photo.findMany({
        where: {
          OR: [
            { caption: { startsWith: keyword } },
            { caption: { contains: keyword } },
          ],
        },
        mode: "insensitive", // 대소문자 구별하지 않음
        take: 4,
        skip: (page - 1) * 4,
      });

      const totalPhotos = await client.photo.count({
        where: {
          OR: [
            { caption: { contains: keyword } },
            { caption: { startsWith: keyword } },
          ],
        },
        mode: "insensitive",
      });

      return {
        ok: true,
        photos,
        totalPage: Math.ceil(totalPhotos / 4),
      };
    },
  },
};
