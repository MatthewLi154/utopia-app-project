import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileMatches } from "../../store/match";
import { messageMatching } from "../../store/message";
import { fetchAllProfiles } from "../../store/profile";
import ChatCard from "./chatCard";
import { io } from "socket.io-client";
let socket;

// instantiate socket io instance and then prop it down
// socket = io()

function CreateConversation() {
  const dispatch = useDispatch();

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
    // when component unmounts, disconnect
        return () => {
        socket.disconnect();
        };
    }, []);

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
        <ChatCard key={profile.id} profile={profile} matches={matches} socket={socket} />
      ))}
    </div>
  );
}

export default CreateConversation;
