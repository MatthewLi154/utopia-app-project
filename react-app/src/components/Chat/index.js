import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchAllProfiles } from "../../store/profile";
import ChatCard from "./chatCard";


function CreateConversation() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, []);

  let matches = useSelector((state) => Object.values(state.matches.matchedProfiles)
  );

  return (
    <div>
      {matches.map((match) => (
        <ChatCard key={match.id} match={match} />
      ))}
    </div>
  );
}

export default CreateConversation;
