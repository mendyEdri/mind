import React, {useState} from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";

import {DELETE_POST} from '../Queries/deletePost';
import {DELETE_COMMENT} from '../Queries/comments';
import {FETCH_POSTS} from '../Queries/posts';

type PropType = {
  postId: string;
  commentId?: string;
  callback?: () => void;
}

const DeleteButton = ({postId, commentId, callback}: PropType) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
 
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const onRequestUpdate = (proxy) => {
    setConfirmOpen(false);
    if (!commentId) {
      const data = proxy.readQuery({
        query: FETCH_POSTS
      });
      const posts = data.getPosts.filter((p) => p.id !== postId);
      proxy.writeQuery({ query: FETCH_POSTS, data: { getPosts: posts } });
    }
  
    callback?.();
  }

  const [deletePostOrComment] = useMutation(mutation, {
      update: onRequestUpdate,
      variables: { 
          postId,
          commentId
      }
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setConfirmOpen(true)}
        floated="right"
      >
        <Icon style={{ margin: 0 }} name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePostOrComment()}
      />
    </>
  );
};

export default DeleteButton;
