import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMessages,currentConv } from "../../store/message";
import Chat from "../Chat/chat";


function ChatCard({profile, matches,socket }) {

    const [selected, setSelected] = useState(false)
    const [close, setClose] = useState()
    const dispatch = useDispatch();
    const selectedEl = useRef(null)
   

    const match = matches.find(match => profile.id === match.profile_id || profile.id === match.matched_profile_id)
    const current = useSelector(state => state.messages.current)


    const joinRoom = () => {
        if (match.id !== '') {
        socket.emit('join_room',{ match: match.id });
        }
        return
    }


    const onClick = () => {
        dispatch(fetchAllMessages(profile.id));
        dispatch(currentConv(match.id));
        joinRoom();
        setSelected(!selected)
    }

    return (
      <>
        <div
    
          onClick={() => {
            onClick()
          }}
        >
          {profile?.first_name}
        </div>
        <div>
        {current === match?.id &&
          (
            <Chat profile={profile} match={match} socket={socket} />
          )}
        </div>
      </>
    );
}

export default ChatCard;
