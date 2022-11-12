import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchSingleProfile } from "../../store/profile";

function SingleUserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProfile(userId));
  }, []);

  return (
    <>
      <h1>Single Profile</h1>
      <h2>{userId}</h2>
    </>
  );
}

export default SingleUserProfile;
