// constants
const LOAD_ALL_PROFILES = "profile/loadAllProfiles";
const ADD_PROFILE = "profile/addProfile";
const LOAD_SINGLE_PROFILE = "profile/loadSingleProfile";
const EDIT_PROFILE = "profile/editProfile";
const DELETE_PROFILE = "profile/deleteProfile";
const UPDATE_SCORE_PROFILE = "profile/updateScore";

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

export const deleteProfile = (id) => {
  return {
    type: DELETE_PROFILE,
    id: id,
  };
};

export const updateScore = (profileId) => {
  return {
    type: UPDATE_SCORE_PROFILE,
    id: profileId,
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

export const editSingleProfile = (newProfileData, id) => async (dispatch) => {
  const response = await fetch(`/api/profile/${id}`, {
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

export const deleteSingleProfile = (id) => async (dispatch) => {
  const response = await fetch(`/api/profile/${id}`, {
    method: "DELETE",
  });

  if (response) {
    const data = await response.json();
    dispatch(deleteProfile(id));
    return data;
  }
};

export const updateScoreProfile = (score, profileId) => async (dispatch) => {
  const response = await fetch(
    `/api/profile/${profileId}/personality-questions`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(score),
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(updateScore(data));
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
      profileStateObj.user_profiles[action.profile.id] = action.profile;
      profileStateObj.singleProfile = action.profile;
      return profileStateObj;
    case DELETE_PROFILE:
      delete profileStateObj.user_profiles[action.id];
      profileStateObj.singleProfile = {};
      return profileStateObj;
    default:
      return state;
  }
};

export default profileReducer;
