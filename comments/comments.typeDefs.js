import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: Int!
    user: User!
    photo: Photo!
    content: String!
    isOwn: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
