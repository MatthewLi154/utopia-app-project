import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import { NavLink, useParams } from "react-router-dom";

function ProfileCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const userProfiles = useSelector((state) => state.profiles.user_profiles);
  const currentUserId = useSelector((state) => state.session.user.id);
  const matchedProfiles = useSelector((state) =>
    Object.values(state.matches.matchedProfiles)
  );

  let matches = false;
  let vampires = false;
  let humans = false;
  let fairies = false;
  let other = false;

  // Filter users for each criteria
  if (category === "matches") {
    // use matched profiles to get user profiles
    matches = true;
  } else if (category === "vampires") {
    vampires = true;
  } else if (category === "humans") {
    humans = true;
  } else if (category === "fairies") {
    fairies = true;
  } else {
    other = true;
  }

  const matchesPage = (
    <>
      <h1>Matches</h1>
    </>
  );
  const vampiresPage = (
    <>
      <h1>Vampires</h1>
    </>
  );

  return (
    <>
      {matches && matchesPage}
      {vampires && vampiresPage}
    </>
  );
}

export default ProfileCategory;
