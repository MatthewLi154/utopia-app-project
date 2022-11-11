import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { fetchAllProfiles } from "../../store/profile";
import "./Profiles.css";

function Profile() {
  const userProfiles = useSelector((state) => state.profiles.user_profiles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, []);

  let userProfilesArray = [];
  for (const profile in userProfiles) {
    userProfilesArray.push(userProfiles[profile]);
  }
  // console.log(userProfilesArray);

  return (
    <div>
      <h1>Utopia Profile</h1>
      <div className="main-profiles-page-container">
        <h2>I'm working on it...</h2>
        {userProfiles &&
          userProfilesArray.map((profile) => (
            <div className="profile-box" key={profile.id}>
              <h3>{profile.first_name}</h3>
              <h3>{profile.last_name}</h3>
              <h3>{profile.bio}</h3>
              <h3>{profile.score}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Profile;
