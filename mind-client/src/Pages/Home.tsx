import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS } from "../Queries/posts";
import { Grid, Transition } from "semantic-ui-react";

import PostForm from "../Components/PostForm";
// import { AuthContext } from "../Context/auth";
import PostCard from "../Components/PostCard";

const Home = () => {
  // const context = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POSTS);
  const posts = data?.getPosts;

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <PostForm />
        </Grid.Column>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
