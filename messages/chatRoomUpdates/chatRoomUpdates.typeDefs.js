import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    chatRoomUpdates(id: Int!): Message
  }
`;
