import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    getChatRooms: protectedResolver(async (_1, _2, { loggedInUser }) =>
      client.chatRoom.findMany({
        where: {
          users: { some: { id: loggedInUser.id } },
        },
      })
    ),
  },
};
