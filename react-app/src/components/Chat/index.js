import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileMatches } from "../../store/match";
import { messageMatching } from "../../store/message";
import { fetchAllProfiles } from "../../store/profile";
import ChatCard from "./chatCard";


function CreateConversation() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProfiles());
    dispatch(getProfileMatches())
    dispatch(messageMatching())
  }, [dispatch]);

  let profileMatches = useSelector((state) => Object.values(state.matches.matchedProfiles));
  let matches = useSelector((state) => Object.values(state.messages.matches))
  console.log('matches', matches)

  return (
    <div>
      {profileMatches?.map((profile) => (
        <ChatCard key={profile.id} profile={profile} matches={matches} />
      ))}
    </div>
  );
}

export default CreateConversation;
