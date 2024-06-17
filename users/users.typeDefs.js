import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    email: String!
    name: String!
    username: String!
    bio: String
    avatar: String
    following: [User]
    totalFollowing: Int!
    followers: [User]
    totalFollowers: Int!
    isOwnProfile: Boolean!
    isFollowing: Boolean!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }
`;
