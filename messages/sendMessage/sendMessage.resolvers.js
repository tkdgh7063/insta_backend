import client from "../../client.js";
import { NEW_MESSAGE } from "../../constants.js";
import pubsub from "../../pubsub.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { content, chatroomId, userId }, { loggedInUser }) => {
        let chatRoom = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });

          if (!user) {
            return {
              ok: false,
              error: "User not Found.",
            };
          }

          chatRoom = await client.chatRoom.create({
            data: {
              users: { connect: [{ id: userId }, { id: loggedInUser.id }] },
            },
          });
        } else if (chatroomId) {
          chatRoom = await client.chatRoom.findUnique({
            where: { id: chatroomId },
            select: { id: true },
          });
          if (!chatRoom) {
            return {
              ok: false,
              error: "ChatRoom not Found.",
            };
          }
        }

        const message = await client.message.create({
          data: {
            content,
            chatroom: { connect: { id: chatRoom.id } },
            user: { connect: { id: loggedInUser.id } },
          },
        });

        pubsub.publish(NEW_MESSAGE, { chatRoomUpdates: { ...message } });
        // console.log("Message published: ", message);

        return {
          ok: true,
        };
      }
    ),
  },
};
