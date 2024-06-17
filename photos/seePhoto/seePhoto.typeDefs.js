import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePhoto(id: String): Photo
  }
`;
