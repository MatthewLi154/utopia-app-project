// constants
const ADD_MATCHES = "matches/addMatches";
const GET_MATCHES = "matches/getMatches";

// actions
export const storeAllMatches = (data) => {
  return {
    type: ADD_MATCHES,
    matches: data,
  };
};

export const getUserMatches = (id) => {
  return {
    type: GET_MATCHES,
    id: id,
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
    case GET_MATCHES:
      return matchesStateObj;
    default:
      return state;
  }
};

export default matchesReducer;
