const LOAD = 'search/LOAD';

const load = (results) => ({
  type: LOAD,
  results,
});

export const loadResults = (term) => async (dispatch) => {
  const response = await fetch(`/api/users/${term}`);

  if (response.ok) {
    const results = await response.json();
    dispatch(load(results));
    return results;
  }
};

const initialState = {};
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const newState = { ...action.results };
      return newState;
    }
    default:
      return state;
  }
};

export default searchReducer;
