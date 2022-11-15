import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAllProfiles } from "../../store/profile";

function Home() {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles.user_profiles);

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, []);
  return (
    <div>
      <h1>Utopia Home</h1>
      <h2>Hello</h2>
    </div>
  );
}

export default Home;
