import { gql } from "apollo-server-core";

export default gql`
  type CheckFollowerQuery {
    ok: Boolean!
    error: String
    followers: [User]
    totalPage: Int
  }
  type Query {
    checkFollower(username: String!, page: Int!): CheckFollowerQuery!
  }
`;
