import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    user: User!
    isOwn: Boolean!
    isLiked: Boolean!
    file: String!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    comments: [Comment]
    commentsNum: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos: [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    userId: Int!
    photoId: Int!
  }
`;
