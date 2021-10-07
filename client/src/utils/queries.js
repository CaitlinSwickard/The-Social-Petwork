import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query {
    getPosts{
      id
      body
      createdAt
    }
  }
`;
