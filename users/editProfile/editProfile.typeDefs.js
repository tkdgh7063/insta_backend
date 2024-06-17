import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Mutation {
    editProfile(
      email: String
      name: String
      username: String
      password: String
      bio: String
      avatar: Upload
    ): MutationResult!

    # Multiple uploads are supported. See graphql-upload docs for details.
    # singleUpload(file: Upload!): File!
  }
`;
