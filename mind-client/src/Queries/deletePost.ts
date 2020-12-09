import gql from 'graphql-tag';

const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export {
    DELETE_POST
}