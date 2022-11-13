// constants
const ADD_MATCHES = "matches/addMatches";

// actions
export const storeAllMatches = (data) => {
  return {
    type: ADD_MATCHES,
    matches: data,
  };
};

// thunks

// reducer

const initialState = { matchedUsers: {} };

const matchesReducer = (state = initialState, action) => {
  let matchesStateObj = { ...state };
  switch (action.type) {
    case ADD_MATCHES:
      matchesStateObj.matchedUsers = action.matches;
      return matchesStateObj;
    default:
      return state;
  }
};

export default matchesReducer;
