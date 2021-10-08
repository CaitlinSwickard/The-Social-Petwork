import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query {
    getPosts{
      id
      body
      createdAt
      username
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`;
