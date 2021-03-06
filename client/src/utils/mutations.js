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

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!){
    likePost(postId: $postId){
      id
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost($postId: ID!, $body: String!){
    updatePost(postId: $postId, body: $body){
      id
    }
  }
`;