// constants
const LOAD_ALL_PROFILES = "profile/loadAllProfiles";
const ADD_PROFILE = "profile/addProfile";

// actions
export const getUserProfiles = (data) => {
  return {
    type: LOAD_ALL_PROFILES,
    profiles: data,
  };
};

export const addUserProfile = (data) => {
  return {
    type: ADD_PROFILE,
    profile: data,
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

export const createProfile = (newProfileData) => async (dispatch) => {
  const response = await fetch("/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProfileData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addUserProfile(data));
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
    case ADD_PROFILE:
      profileStateObj.singleProfile = action.profile;
      return profileStateObj;
    default:
      return state;
  }
};

export default profileReducer;
