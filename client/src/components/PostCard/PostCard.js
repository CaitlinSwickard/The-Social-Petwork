import React, { useContext, useState } from "react";
import { Button, Card, Icon, Label, Image, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../../context/auth";
import { QUERY_POSTS } from "../../utils/queries";
import { DELETE_POST_MUTATION, LIKE_POST_MUTATION, UPDATE_POST_MUTATION } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import "./postcard.css";

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
  const { user } = useContext(AuthContext);

  const newBody = document.querySelector("#newBody");

  const userLiked = (likes.find(like => like.username === user.username)) ? true : false;

  const [like, setLike] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(userLiked);

  const likeHandler = () => {
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(!isLiked);
  }

  const [editing, setEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);

  function updateHandler(event) {
    event.preventDefault();
    if (editedBody !== body) {
      updatePost();
    }
    setEditing(!editing);
  }

  const [deletePost, { deleteError }] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId: id
    },
    onError(deleteError) { 
      return deleteError;
    },
    refetchQueries: [
      QUERY_POSTS
    ]
  });
  
  const [likePost, { likeError }] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      postId: id
    },
    onError(likeError) {
      return likeError;
    },
    onCompleted(){
      likeHandler();
    }
  });

  const [updatePost, { updateError }] = useMutation(UPDATE_POST_MUTATION, {
    variables: {
      postId: id,
      body: editedBody
    },
    onError(updateError) {
      return updateError;
    },
    refetchQueries: [
      QUERY_POSTS
    ]
  });

  function onChange(event){
    setEditedBody(event.target.value);
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Meta>{moment(createdAt).fromNow()} by <span className="post-username">{username}</span></Card.Meta>
        {editing ? (
        <Card.Description>
          <Form>
            <Form.Field label='Edit your post' control='textarea' rows='3' id="newBody" value={editedBody} onChange={onChange} />
            <Button onClick={updateHandler}>Submit</Button>
          </Form>
        </Card.Description>) : (
          <Card.Description>{body}</Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='teal' basic>
            <Icon name='paw' />
          </Button>
          <Label basic color='teal' pointing='left'>
            {like}
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
          <div>
            <Button icon onClick={updateHandler}>
              <Icon name="pencil" size="small"/>
            </Button>
            <Button icon onClick={deletePost}>
              <Icon name="trash" size="small"/>
            </Button>
          </div>
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard;