// constants
const LOAD_ALL_PROFILES = "profile/loadAllProfiles";
const ADD_PROFILE = "profile/addProfile";
const LOAD_SINGLE_PROFILE = "profile/loadSingleProfile";
const EDIT_PROFILE = "profile/editProfile";

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

export const getSingleProfile = (data) => {
  return {
    type: LOAD_SINGLE_PROFILE,
    profile: data,
  };
};

export const editProfile = (data) => {
  return {
    type: EDIT_PROFILE,
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

export const fetchSingleProfile = (id) => async (dispatch) => {
  const response = await fetch(`/api/profile/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(addUserProfile(data));
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

export const editSingleProfile = (newProfileData) => async (dispatch) => {
  const response = await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProfileData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editProfile(data));
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
    case LOAD_SINGLE_PROFILE:
      profileStateObj.singleProfile = action.profile;
      return profileStateObj;
    case EDIT_PROFILE:
      return profileStateObj;
    default:
      return state;
  }
};

export default profileReducer;
