import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [postData, setPostDataState] = useState({
    isLoading: false,
    postsDataObject: {}, // {'1': {id: '1', title, body, comments: []}}
    // Object.keys(postsDataObject) //['1', '2'], Object.values(postsDataObject) -> [{}]
    posts: [], // [{id: '1', title, body}]
  });

  const setPostData = (data) => {
    setPostDataState({ ...postData, ...data });
  };

  return (
    <PostContext.Provider value={{ postData, setPostData }}>
      {props.children}
    </PostContext.Provider>
  );
};
