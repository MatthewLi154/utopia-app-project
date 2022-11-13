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

export const getMatches = (data) => {
  return {
    type: GET_MATCHES,
    matches: data,
  };
};

// thunks
export const getProfileMatches = () => async (dispatch) => {
  const response = await fetch("/api/matches");

  if (response.ok) {
    const data = await response.json();
    dispatch(getMatches(data));
    return data;
  }
};

export const getProfileMatchPercentage = () => async (dispatch) => {
  const response = await fetch("/api/matches/match-percent");

  if (response.ok) {
    const data = await response.json();
    dispatch(addMatches(data));
    return data;
  }
};

export const addNewMatches = (data) => async (dispatch) => {
  const response = await fetch("/api/matches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addMatches(data));
    return data;
  }
};

// reducer

const initialState = { matchedPercent: {}, matchedProfiles: {} };

const matchesReducer = (state = initialState, action) => {
  let matchesStateObj = { ...state };
  switch (action.type) {
    case ADD_MATCHES:
      matchesStateObj.matchedPercent = action.matches;
      return matchesStateObj;
    case GET_MATCHES:
      matchesStateObj.matchedProfiles = action.matches;
      return matchesStateObj;
    default:
      return state;
  }
};

export default matchesReducer;
