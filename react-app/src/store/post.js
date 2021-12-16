const CREATE_POST = 'post/CREATE_POST';
const GET_ALL_POSTS = 'post/GET_POSTS';
const GET_USERS_POSTS = 'post/GET_USERS_POSTS';
const DELETE_POST = 'post/DELETE_POST';
const EDIT_POST = 'post/EDIT_POST';

const newPost = (post) => ({
  type: CREATE_POST,
  post,
});

const getAllPosts = (posts) => ({
  type: GET_ALL_POSTS,
  posts,
});

const getUsersPosts = (posts) => ({
  type: GET_USERS_POSTS,
  posts,
});

const editPost = (post) => ({
  type: EDIT_POST,
  post,
});

const deletePost = (post) => ({
  type: DELETE_POST,
  post,
});

// Creates a post
export const createPost = (formdata) => async (dispatch) => {
  console.log('XXXXXXX this is it =====>', formdata.get('user_id'));
  const response = await fetch(
    `/api/users/${formdata.get('user_id')}/posts/new`,
    {
      method: 'POST',
      body: formdata,
    }
  );
  console.log('this is response', response);
  if (response.ok) {
    const post = await response.json();
    dispatch(newPost(post));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

// Gets a single users posts
export const getSingleUserPosts = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/posts`);
  if (response.ok) {
    const posts = await response.json();
    dispatch(getUsersPosts(posts));
    return posts;
  }
};

// Gets all posts
export const getPosts = () => async (dispatch) => {
  const response = await fetch('/api/users/posts');
  if (response.ok) {
    const posts = await response.json();
    dispatch(getAllPosts(posts));
    return posts;
  }
};

//Edits a single post
export const editOnePost = (userid, content, id) => async (dispatch) => {
  const response = await fetch(`/api/users/${userid}/posts/${id}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (response.ok) {
    const edited = await response.json();
    dispatch(editPost(edited));
    return edited;
  }
};

//Delete a post
export const deleteOnePost = (userid, id) => async (dispatch) => {
  const response = await fetch(`/api/users/${userid}/posts/${id}/delete`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(deletePost(post));
    return post;
  }
};

const initialState = {};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST: {
      const newState = {
        ...state,
        [action.post.id]: action.post,
      };
      return newState;
    }
    case GET_ALL_POSTS: {
      const newState = {
        ...state,
        ...action.posts.posts,
      };
      return newState;
    }
    case EDIT_POST: {
      const newState = {
        ...state,
        [action.post.id]: action.post,
      };
      return newState;
    }

    case DELETE_POST: {
      const newState = {
        ...state,
      };
      delete newState[action.post.id];
      return newState;
    }
    default:
      return state;
  }
};

export default postReducer;
