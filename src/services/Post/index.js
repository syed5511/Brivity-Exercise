import axios from "axios";
const BASE_URL = "https://brivity-react-exercise.herokuapp.com";
const Authorization = localStorage.getItem("Authorization") || "";
// "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMSIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTY0MjAyNzMyMSwiZXhwIjoxNjQyMDMwOTIxLCJqdGkiOiIyNGE0MWYxZi02YzBmLTRhOWEtYjRjZS1iNGYwYjAxZDQzMWUifQ.inEUDFX81FZYFBTfc1ehjms5IPPNf4-GU-c0jDJrOBY"

// function genericService (data){
//     const {url, method, data, headers, successCallBack, failureCallBack} = data
//     axios({
//         url,
//         method,
//         data,
//         headers,
//     })
//     .then(res =>{
//         if(successCallBack){
//             return successCallBack(res)
//         }
//          return res
//         })
//     .catch(error => {
//         if(failureCallBack){
//             return failureCallBack(error)
//         }
//         return error
//     })
// }
export function fetchComments(data) {
  const { post_id, setPostData, postsDataObject } = data;
  const URL = `${BASE_URL}/posts/${post_id}/comments`;
  axios
    .get(URL, { Authorization })
    .then((res) => {
      const postsDataObjectCopy = { ...postsDataObject }; // {1:{}, 2: {}}
      postsDataObjectCopy[post_id].comments = res.data.comments || [];
      setPostData({
        isLoading: false,
        error: null,
        postsDataObject: postsDataObjectCopy,
      });
    })
    .catch((err) => {
      console.log("----comments error", err);
      setPostData({ isLoading: false });
    });
}

export function addComment(data) {
  const { post_id, comment, setPostData, postsDataObject } = data;
  const URL = `${BASE_URL}/comments`;
  axios
    .post(
      URL,
      { comment: { post_id: post_id, content: comment } },
      {
        headers: {
          Authorization,
        },
      }
    )
    .then((res) => {
      const postsDataObjectCopy = { ...postsDataObject }; // {1:{}, 2: {}}
      postsDataObjectCopy[post_id].comments = [
        ...postsDataObjectCopy[post_id].comments,
        res.data.comment,
      ];
      setPostData({
        isLoading: false,
        error: null,
        postsDataObject: postsDataObjectCopy,
      });
    })
    .catch((err) => {
      console.log("----comments error", err);
      setPostData({ isLoading: false });
    });
}

export function fetchPosts(data = {}) {
  const { pageNumber, setPostData } = data;
  const URL = `${BASE_URL}/posts/?page=1`;
  setPostData({ isLoading: true });
  axios
    .get(URL, { Authorization })
    .then((res) => {
      const postsDataObject = {};
      res.data.posts.forEach((post) => {
        postsDataObject[post.id] = { ...post, comments: [] };
      });
      setPostData({
        isLoading: false,
        error: null,
        postData: res.data,
        posts: res.data.posts,
        postsDataObject,
      });
    })
    .catch((err) => {
      console.log("----fetch posts error", err);
      setPostData({ isLoading: false, error: err });
    });
}

export function addPost(data = {}) {
  const {
    title = "no title",
    body = "no content",
    postsDataObject,
    setPostData,
  } = data;
  const URL = `${BASE_URL}/posts`;
  const payload = { post: { title: title, body: body } };
  axios
    .post(URL, payload, {
      headers: {
        Authorization,
      },
    })
    .then((res) => {
      const postsDataObjectCopy = { ...postsDataObject };
      postsDataObjectCopy[res.data.post.id] = res.data.post;
      setPostData({
        isLoading: false,
        error: null,
        postsDataObject: postsDataObjectCopy,
      });
    })
    .catch((err) => {
      console.log("----create posts error", err);
      setPostData({ isLoading: false, error: err });
    });
}

export function deletePost({ post_id, postsDataObject, setPostData }) {
  const URL = `${BASE_URL}/posts/${post_id}`;
  axios
    .delete(URL, {
      headers: {
        Authorization,
      },
    })
    .then((res) => {
      const postsDataObjectCopy = { ...postsDataObject };
      delete postsDataObjectCopy[post_id];
      setPostData({
        isLoading: false,
        error: null,
        postsDataObject: postsDataObjectCopy,
      });
    })
    .catch((err) => {
      console.log("----delete posts error", err);
      setPostData({ isLoading: false, error: err });
    });
}
