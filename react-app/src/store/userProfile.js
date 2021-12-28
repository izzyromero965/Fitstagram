const LOAD_PROFILE = 'profile/LOAD_PROFILE';
const REMOVE_PROFILE = 'profile/REMOVE_PROFILE';
const FOLLOW = 'followers/FOLLOW';

const load = (profile) => ({
  type: LOAD_PROFILE,
  profile,
});

const remove = () => ({
  type: REMOVE_PROFILE,
});

export const loadProfile = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`);
  if (response.ok) {
    const userProfile = await response.json();
    dispatch(load(userProfile));
    return userProfile;
  }
};

export const removeProfile = () => (dispatch) => {
  dispatch(remove());
};

const initialState = {};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      console.log('xxxxxx12132132', action);
      const newState = {
        ...state,
      };
      let followArray = Object.values(action.follows)
      newState.followers[action.follows.follower_id] = action.follows;
      return newState;
    }
    case LOAD_PROFILE: {
      const newState = {
        ...action.profile,
      };
      return newState;
    }
    case REMOVE_PROFILE: {
      return {};
    }
    default:
      return state;
  }
};

export default profileReducer;
