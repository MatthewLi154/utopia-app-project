import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMessages,currentConv } from "../../store/message";
import Chat from "../Chat/chat";
import { io } from "socket.io-client";
let socket;


function ChatCard({ match }) {

    const [selected, setSelected] = useState(false)
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
    // when component unmounts, disconnect
        return () => {
        socket.disconnect();
        };
    }, []);


    const joinRoom = () => {
        if (match.id !== '') {
        socket.emit('join_room',{ match: match.id });
        // need to edit match.id so that both users share the same
        }
        return
    }

    const leaveRoom = ()=> {
    // return chatRoomUsers.filter((user) => user.id != userID);
    socket.emit('leave_room', {  match: match.id })
    // need to edit match.id so that both users share the same
    return
    }


    return (
        <div>
        <p
            onClick={() => {
                dispatch(fetchAllMessages(match.id))
                dispatch(currentConv(match.id))
                joinRoom()
                setSelected(!selected)
            }}
            onBlur={() => {
                leaveRoom()
            }}
        >
            {match?.first_name}
            {/* {match?.last_name} */}
        </p>
        {selected && (
            <Chat match={match}/>
        )}
        </div>
    );
}

export default ChatCard;
