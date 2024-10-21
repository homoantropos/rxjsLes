export const ADD_POST = "ADD_POST";

export const UPDATE_POST = "UPDATE_POST";

export const DELETE_POST = "DELETE_POST";

export const SET_POSTS = "SET_POSTS";

export const CLEAR = "CLEAR";

export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});

export const updatePost = (post) => ({
  type: UPDATE_POST,
  payload: post,
});

export const deletePost = (post) => ({
  type: DELETE_POST,
  payload: post,
});

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
});

export const clearStore = () => ({
  type: CLEAR,
});
