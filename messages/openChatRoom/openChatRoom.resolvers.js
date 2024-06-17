import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    openChatRoom: protectedResolver((_, { id }, { loggedInUser }) =>
      client.chatRoom.findFirst({
        where: {
          id,
          users: { some: { id: loggedInUser.id } },
        },
      })
    ),
  },
};
