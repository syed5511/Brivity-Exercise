import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Form,
  Col,
  ListGroup,
  ListGroupItem,
  Container,
} from "react-bootstrap";

const PostCard = ({ post, fetchComments, addComment, addPost, deletePost }) => {
  const [comment, setComment] = useState("");
  const [initialState, setState] = useState({ title: "", body: "" });

  const onChangeHandler = (key) => (event) => {
    setState({ ...initialState, [key]: event.target.value }); //{key: }
  };

  const { title = "", body = "", id = "", comments = [] } = post || {};
  useEffect(() => {
    if (post !== null) fetchComments();
  }, []);

  const AddComment = () => {
    addComment(comment);
  };

  const disableAdd = title.length > 0 && body.length > 0;
  const AddPost = (e) => {
    const { title, body } = initialState;
    e.preventDefault();
    if (!disableAdd) addPost({ title, body });
  };
  const onDeletePost = () => {
    deletePost();
  };

  if (post === null) {
    return (
      <Card style={{ width: "18rem" }}>
        <Container>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title..."
                onChange={onChangeHandler("title")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="content..."
                onChange={onChangeHandler("body")}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={AddPost}
              disabled={disableAdd}
            >
              Create Post
            </Button>
          </Form>
        </Container>
      </Card>
    );
  }

  return (
    <Card style={{ width: "18rem" }}>
      <span>
        <button onClick={onDeletePost}>{`Delete Post ID - ${post.id}`}</button>
      </span>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Row>
          <Col>
            <Form.Control
              className="me-auto"
              type="textarea"
              placeholder="Add a comment..."
              onChange={(e) => setComment(e.target.value)}
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={AddComment}>
              Add
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Card.Header>Comments</Card.Header>
          <ListGroup className="list-group-flush">
            {comments.map((el, i) => (
              <ListGroupItem key={i}>{el.content}</ListGroupItem>
            ))}
          </ListGroup>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default PostCard;
