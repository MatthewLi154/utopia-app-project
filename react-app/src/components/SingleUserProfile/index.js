import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import "./SingleUserProfile.css";

function SingleUserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state?.profiles.singleProfile);

  useEffect(() => {
    dispatch(fetchSingleProfile(userId));
    dispatch(fetchAllProfiles());
  }, []);

  return (
    <>
      <div className="single-profile-container">
        <h1>Single Profile</h1>
        <h2>{userId}</h2>
        <h2>{profile.first_name}</h2>
        <h2>{profile.last_name}</h2>
      </div>
    </>
  );
}

export default SingleUserProfile;
