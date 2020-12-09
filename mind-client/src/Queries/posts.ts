import gql from "graphql-tag";

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const CREATE_POST = gql`
    mutation createPost($body: String!) {
      createPost(body: $body) {
        id body createdAt username
        likeCount
        commentCount 
        likes {
          id username createdAt
        }
        comments {
          id body username createdAt
        }
      }
    }
`;

export {
    FETCH_POSTS,
    CREATE_POST
}