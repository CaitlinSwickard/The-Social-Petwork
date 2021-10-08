import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../../context/auth";
import { DELETE_POST_MUTATION } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import "./postcard.css";

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) {
  const { user } = useContext(AuthContext);

  function reloadPage(){
    window.location.reload();
  }

  const [deletePost, { error }] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId: id
    },
    onError(err) { 
      return err;
    },
    onCompleted() {
      reloadPage();
    }
  });
  
  function likePost(){
    console.log("likePost");
  }

  function deletePostCallback(){
    deletePost(postId);
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Meta>{moment(createdAt).fromNow()} by <span className="post-username">{username}</span></Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='teal' basic>
            <Icon name='paw' />
          </Button>
          <Label basic color='teal' pointing='left'>
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right'>
          <Button color='blue' basic>
            <Icon name='comments' />
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button icon onClick={deletePost}>
            <Icon name="trash" size="small"/>
          </Button>
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard;