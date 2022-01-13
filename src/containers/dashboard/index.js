import React, { useEffect, useContext } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Form,
  Col,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import PostCard from "./../../components/PostCard";
import { PostContext } from "./../../ContextAPI/PostContext";
import {
  fetchComments,
  fetchPosts,
  addPost,
  addComment,
  deletePost,
} from "./../../services/Post";

function Dashboard() {
  const postContext = useContext(PostContext);
  const { postData, setPostData } = postContext;
  const { isLoading, posts, postsDataObject } = postData;

  useEffect(() => {
    fetchPosts({ pageNumber: 1, setPostData });
  }, []);

  const fetchCommentsData = ({ post_id }) => {
    fetchComments({ post_id, setPostData, postsDataObject });
  };
  const addCommentData = ({ post_id, comment }) => {
    addComment({ post_id, comment, setPostData, postsDataObject });
  };
  const addPostData = ({ title, body }) => {
    addPost({ title, body, setPostData, postsDataObject });
  };
  return (
    <Container>
      {isLoading ? (
        <Row>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <Row>
          <PostCard
            post={null}
            addPost={({ title, body }) => addPostData({ title, body })}
          />
          {Object.values(postsDataObject).map((post, i) => (
            <PostCard
              key={i}
              post={post}
              fetchComments={() => fetchCommentsData({ post_id: post.id })}
              addComment={(comment) =>
                addCommentData({ post_id: post.id, comment })
              }
              deletePost={() =>
                deletePost({ post_id: post.id, postsDataObject, setPostData })
              }
            />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Dashboard;
