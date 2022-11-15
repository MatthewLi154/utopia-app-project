import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileMatches } from "../../store/match";
import { fetchAllProfiles } from "../../store/profile";
import ChatCard from "./chatCard";


function CreateConversation() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProfiles());
    dispatch(getProfileMatches())
  }, [dispatch]);

  let matches = useSelector((state) => Object.values(state.matches.matchedProfiles)
  );

  return (
    <div>
      {matches?.map((match) => (
        <ChatCard key={match.id} match={match} />
      ))}
    </div>
  );
}

export default CreateConversation;
