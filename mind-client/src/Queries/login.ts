import gql from "graphql-tag";

const LOGIN_USER = gql`
    mutation login($username: String! $password: String!) {
        login(username: $username password: $password) {
            id email username createdAt token
        }
    }
`;

export {
    LOGIN_USER
}