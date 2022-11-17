import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMessages,currentConv } from "../../store/message";
import Chat from "../Chat/chat";


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

    return (
        <div>
        <p
            onClick={() => {
                dispatch(fetchAllMessages(profile.id))
                dispatch(currentConv(profile.id))
                joinRoom()
                setSelected(!selected)
            }}
        >
            {profile?.first_name}
        </p>
            {selected && (
                <Chat profile={profile} match={match} socket={socket}/>
        )}

        </div>
    );
}

export default ChatCard;
