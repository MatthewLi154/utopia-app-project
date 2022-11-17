import React, { useState, } from "react";
import { useDispatch } from "react-redux";
import { fetchAllMessages,currentConv } from "../../store/message";
import { fetchSingleProfile } from "../../store/profile";
import './chat.css'


function ChatCard({profile, matches,socket }) {

    const [selected, setSelected] = useState(false)
    const dispatch = useDispatch();

    const match = matches.find(match => profile.id === match.profile_id || profile.id === match.matched_profile_id)

    const joinRoom = () => {
        if (match.id !== '') {
        socket.emit('join_room',{ match: match.id });
        }
        return
    }


    const onClick = () => {
        dispatch(fetchAllMessages(profile.id));
        dispatch(currentConv(match.id));
        dispatch(fetchSingleProfile(profile.id))
        joinRoom();
        setSelected(!selected)
    }

    return (
            <div
            className="chatList_item"
              onClick={() => {
                onClick();
              }}
            >
              {profile?.first_name.toUpperCase()}
            </div>
    );
}

export default ChatCard;
