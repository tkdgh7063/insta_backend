import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    sendMessage(content: String!, chatroomId: Int, userId: Int): MutationResult!
  }
`;
