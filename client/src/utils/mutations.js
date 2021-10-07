import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!){
    createPost(body: $body){
      id
      body
      createdAt
      username
      likes{
        id
        username
        createdAt
      }
      likeCount
      comments{
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;