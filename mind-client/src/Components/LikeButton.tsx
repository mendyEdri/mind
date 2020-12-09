import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Label, Icon } from 'semantic-ui-react';

import {LIKE_POST} from '../Queries/like';
import Popup from './Popup';

type PropsType = {
  user: any;
  post: any
}

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={() => likePost()}>
      <Popup content={liked ? 'Unlike' : 'Like'}>{likeButton}</Popup>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default LikeButton;