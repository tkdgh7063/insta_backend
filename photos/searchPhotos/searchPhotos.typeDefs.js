import { gql } from "apollo-server-core";

export default gql`
  type SearchPhotoResult {
    ok: Boolean!
    error: String
    photos: [Photo]
    totalPage: Int
  }
  type Query {
    searchPhotos(keyword: String!): SearchPhotoResult
  }
`;
