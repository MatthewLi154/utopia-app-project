// constants
const ADD_MATCHES = "matches/addMatches";
const GET_MATCHES = "matches/getMatches";

// actions
export const addMatches = (data) => {
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
export const addNewMatches = (data) => async (dispatch) => {
  // Data should be in format:
  // data = [{
  //     'profile_id': 1,
  //     'matched_profile_id': 2
  // }]
  const response = await fetch("/api/matches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserMatches(data));
    return data;
  }
};

// reducer

const initialState = { matchedUsers: {} };

const matchesReducer = (state = initialState, action) => {
  let matchesStateObj = { ...state };
  switch (action.type) {
    case ADD_MATCHES:
      return matchesStateObj;
    case GET_MATCHES:
      return matchesStateObj;
    default:
      return state;
  }
};

export default matchesReducer;
