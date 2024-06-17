import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    content: String!
    user: User!
    chatroom: ChatRoom!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type ChatRoom {
    id: Int!
    users: [User]
    messages: [Message]
    unreadTotal: Int!
    createdAt: String!
    updatedAt: String!
  }
`;

// totalPage: Int
