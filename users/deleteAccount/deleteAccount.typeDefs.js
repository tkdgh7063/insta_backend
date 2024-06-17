import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteAccount(
      email: String
      username: String
      password: String!
    ): MutationResult!
  }
`;
