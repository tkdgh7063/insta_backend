import { withFilter } from "graphql-subscriptions";
import client from "../../client.js";
import { NEW_MESSAGE } from "../../constants.js";
import pubsub from "../../pubsub.js";

export default {
  Subscription: {
    chatRoomUpdates: {
      subscribe: async (root, args, context, info) => {
        const chatRoom = await client.chatRoom.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loggedInUser.id } },
          },
          select: { id: true },
        });

        if (!chatRoom) {
          throw new Error("CHATROOM NULL");
        } else {
          return withFilter(
            () => pubsub.asyncIterator(NEW_MESSAGE),
            async ({ chatRoomUpdates }, { id }, { loggedInUser }) => {
              if (chatRoomUpdates.chatroomId === id) {
                const chatRoom = await client.chatRoom.findFirst({
                  where: {
                    id,
                    users: { some: { id: loggedInUser.id } },
                  },
                  select: { id: true },
                });
                if (!chatRoom) {
                  return false;
                }
                return true;
              }
            }
          )(root, args, context, info);
        }
      },
    },
  },
};
