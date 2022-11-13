import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import "./SingleUserProfile.css";

function SingleUserProfile() {
  const { profileId } = useParams();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state?.profiles.singleProfile);

  useEffect(() => {
    dispatch(fetchSingleProfile(profileId));
    dispatch(fetchAllProfiles());
  }, []);

  return (
    <>
      <div className="single-profile-container">
        <div className="upper-name-location-age-images-container">
          <div className="name-age-location-match">
            <h3>{profile.first_name}</h3>
            <h3>{profile.location}</h3>
            <h3>{profile.birthday}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleUserProfile;
