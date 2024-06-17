import client from "../client.js";

export default {
  ChatRoom: {
    users: (
      { id } //,{page}) =>
    ) =>
      client.chatRoom
        .findUnique({
          where: { id },
          //take: 10,
          //skip: (page - 1) * 10,
        })
        .users(),
    messages: ({ id }) =>
      client.message.findMany({ where: { chatroomId: id } }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          user: { id: { not: loggedInUser.id } },
          chatroomId: id,
          read: false,
        },
      });
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
