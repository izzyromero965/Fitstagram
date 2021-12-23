const FOLLOW = 'followers/FOLLOW';
const UNFOLLOW = 'followers/UNFOLLOW';
const GET_FOLLOWED = 'follows/GET_FOLLOWED';

const follow = (follows) => ({
  type: FOLLOW,
  follows,
});

const unfollow = (removeData) => ({
  type: UNFOLLOW,
  removeData,
});

const getFollowed = (follows) => ({
  type: GET_FOLLOWED,
  follows,
});

export const followUser = (userData) => async (dispatch) => {
  const response = await fetch(`/api/users/follows/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    const followedUser = await response.json();
    dispatch(follow(followedUser));
    return followedUser;
  }
};

export const unfollowUser = (userData) => async (dispatch) => {
  const response = await fetch(
    `/api/users/${userData.follower_id}/follows/${userData.followed_id}/delete`,
    {
      method: 'DELETE',
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(unfollow(data));
    return data;
  }
};

export const getFollowedUsers = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/follows`);
  if (response.ok) {
    const follows = await response.json();
    dispatch(getFollowed(follows));
    return follows;
  }
};

const initialState = {};
const followersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      const newState = {
        ...state,
        ...action.follows,
      };
      return newState;
    }
    case UNFOLLOW: {
      const newState = {
        ...state,
      };
      if (action.removeData.unfollowed_id in newState) {
        delete newState[action.removeData.unfollowed_id];
      }
      return newState;
    }
    case GET_FOLLOWED: {
      const newState = {
        ...state,
        ...action.follows,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default followersReducer;
