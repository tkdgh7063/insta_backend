import { gql } from "apollo-server-core";

export default gql`
  type SearchUserResult {
    ok: Boolean!
    error: String
    users: [User]
    totalPage: Int
  }
  type Query {
    searchUser(keyword: String!): SearchUserResult
  }
`;
