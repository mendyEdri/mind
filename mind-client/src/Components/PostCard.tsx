import React, { useContext } from "react";
import { Button, Card, Image, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../Context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  const renderComment = () => {};

  const renderLike = () => {};

  const renderExtraButtons = () => {
    return (
      <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
        <Button color="blue" basic>
          <Icon name="comments" />
        </Button>
        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    );
  };

  const renderDeleteButton = () => {
    return user && user.username === username && <DeleteButton postId={id} />;
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        {renderExtraButtons()}
        {renderDeleteButton()}
      </Card.Content>
    </Card>
  );
};

export default PostCard;