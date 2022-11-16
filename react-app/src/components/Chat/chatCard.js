import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMessages,currentConv } from "../../store/message";
import Chat from "../Chat/chat";
import { io } from "socket.io-client";
let socket;


function ChatCard({profile, matches,socket }) {

    const [selected, setSelected] = useState(false)
    const dispatch = useDispatch();

    const match = matches.find(match => profile.id === match.profile_id || profile.id === match.matched_profile_id)

    // useEffect(() => {
    //     // open socket connection
    //     // create websocket
    //     socket = io();
    // // when component unmounts, disconnect
    //     return () => {
    //     socket.disconnect();
    //     };
    // }, []);

    const joinRoom = () => {
        if (match.id !== '') {
        socket.emit('join_room',{ match: match.id });
        }
        return
    }

    const leaveRoom = ()=> {
        if (match.id !== '') {
        socket.emit('leave_room',{ match: match.id });
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
            // onBlur={leaveRoom}
        >
            {profile?.first_name}
        </p>
        {/* <button
            onClick={leaveRoom}
            >
                Leave Conversation
        </button> */}
            {selected && (
                <Chat profile={profile} match={match} socket={socket}/>
        )}

        </div>
    );
}

export default ChatCard;
