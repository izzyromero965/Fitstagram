const LOAD_PROFILE = 'profile/LOAD_PROFILE';
const REMOVE_PROFILE = 'profile/REMOVE_PROFILE';

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
