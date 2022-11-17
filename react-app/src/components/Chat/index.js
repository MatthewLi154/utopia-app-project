import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileMatches } from "../../store/match";
import { messageMatching } from "../../store/message";
import { fetchAllProfiles } from "../../store/profile";
import ChatCard from "./chatCard";
import { io } from "socket.io-client";
import { use } from "express/lib/router";
import Chat from "../Chat/chat";
import './chat.css'
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

    let messages = useSelector(state => state?.messages?.matched_messages)

  useEffect(() => {
    dispatch(fetchAllProfiles());
    dispatch(getProfileMatches())
    dispatch(messageMatching())

  }, [dispatch, messages]);



  let profileMatches = useSelector((state) => Object.values(state.matches.matchedProfiles));
  let matches = useSelector((state) => Object.values(state.messages.matches))
  const current = useSelector((state) => state.messages.current);
  console.log(current, 'CURRENT!!!!!!!!!!!')
  const profile = useSelector((state) => state.profiles.singleProfile);
  const match = matches.find(
    (match) =>
      profile?.id === match?.profile_id || profile?.id === match?.matched_profile_id
  );


  return (
    <div className="chat_main_container">
      <div className="chat_container">
        <div className="leftSide">
        {profileMatches?.map((profile) => (
          <ChatCard
            key={profile.id}
            profile={profile}
            matches={matches}
            socket={socket}
          />
        ))}
        </div>
        <div className="rightSide">
          {current === match?.id && (
            <Chat socket={socket} current={current} match={match}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateConversation;
