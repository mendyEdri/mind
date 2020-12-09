import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import _ from 'lodash';

import { CREATE_POST, FETCH_POSTS } from "../Queries/posts";
import { useForm } from "../Utils/hooks";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(hoistedCreatePost, {
    body: "",
  });

  const onRequestUpdate = (proxy, result) => {
    const data = proxy.readQuery({
      query: FETCH_POSTS,
    });
    const posts = [result.data.createPost, ...data.getPosts];
    proxy.writeQuery({ query: FETCH_POSTS, data: { getPosts: posts } });
    values.body = "";
  };

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update: onRequestUpdate,
  });

  function hoistedCreatePost() {
    createPost();
  }

  const renderErrorMessage = () => {
    return (
      <div className="ui error message" style={{marginBottom: 20}}>
        <ul className="list">
          <li>{error.graphQLErrors[0].message}</li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <Form autoComplete='off'  onSubmit={onSubmit}>
        <h2>Create a mind</h2>
        <Form.Field>
          <Form.Input
            placeholder="What's on your mind?"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" secondary disabled={values.body.length === 0}>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && renderErrorMessage()}
    </>
  );
};

export default PostForm;
