import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMessages,currentConv } from "../../store/message";
import Chat from "../Chat/chat";
import { io } from "socket.io-client";
let socket;


function ChatCard({ match }) {

    const [selected, setSelected] = useState(false)
    const dispatch = useDispatch();
    const [room , setRoom] = useState('')

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
        socket.emit('join_room', { match: match.id });
        }
        return
    }
    // call on this function when clicking on a conversation

        // Redirect to /chat
    // navigate('/chat', { replace: true }); // Add this
  // };


    const leaveRoom = ()=> {
    // return chatRoomUsers.filter((user) => user.id != userID);
    socket.emit('leave_room', {  match: match.id })
    return
    }


    // socket.on("users", (users) => {
    //     users.forEach((user) => {
    //     user.self = user.userID === socket.id;
    //     initReactiveProperties(user);
    //     });
    //     // put the current user first, and then sort by username
    //     this.users = users.sort((a, b) => {
    //     if (a.self) return -1;
    //     if (b.self) return 1;
    //     if (a.username < b.username) return -1;
    //     return a.username > b.username ? 1 : 0;
    //     });
    // });

    // socket.on("user connected", (user) => {
    //     initReactiveProperties(user);
    //     this.users.push(user);
    // });

    // const onMessage =(content) => {
    //     if (this.selectedUser) {
    //     socket.emit("private-message", {
    //         content,
    //         to: this.selectedUser.userID,
    //     });
    //     this.selectedUser.messages.push({
    //         content,
    //         fromSelf: true,
    //     });
    //     }
    // }


    return (
        <div>
        <p
            onClick={() => {
                dispatch(fetchAllMessages(match.id))
                dispatch(currentConv(match.id))
                joinRoom()
                setRoom(match.id)
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
