// constants
const LOAD_ALL_PROFILES = "profile/loadAllProfiles";

// actions
export const getUserProfiles = (data) => {
  return {
    type: LOAD_ALL_PROFILES,
    profiles: data,
  };
};

// thunks
export const fetchAllProfiles = () => async (dispatch) => {
  const response = await fetch("/api/profile");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserProfiles(data));
    return data;
  }
};

// reducer
const initialState = { user_profiles: {}, singleProfile: {} };

const profileReducer = (state = initialState, action) => {
  let profileStateObj = { ...state };
  switch (action.type) {
    case LOAD_ALL_PROFILES:
      profileStateObj.user_profiles = action.profiles;
      return profileStateObj;
    default:
      return state;
  }
};

export default profileReducer;
