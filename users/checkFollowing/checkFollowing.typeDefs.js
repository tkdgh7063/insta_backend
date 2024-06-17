import { gql } from "apollo-server-core";

export default gql`
  type CheckFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    checkFollowing(username: String!, cursor: Int!): CheckFollowingResult!
  }
`;
