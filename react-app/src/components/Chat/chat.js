import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {createMessage, fetchAllMessages} from "../../store/message"
let socket;

const Chat = ({profile, match}) => {
  const [body, setBody] = useState("");
  const [messages, setMessages] = useState([]);

  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.session.user);
  console.log('MATCHID', match.id)


  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
    socket.emit("join", {'match': match.id})
    socket.on("chat", (chat) => {
      console.log(chat)
      setMessages((messages) => [...messages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("last_25_messages", (message_list) => {
      console.log("Last 25 messages:", (message_list))
      setMessages((message) => [...message_list, ...message])
    })
    }
  , [messages])

  const updateChatInput = (e) => {
    setBody(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();
    socket.emit("chat", {message: body, room: match.id });
    // add room: property with room name as a key
    // update emits and ons with new message: object


    const payload = {
            body
        }
    let newMessage = await dispatch(createMessage(match.id,payload))
    if (newMessage) {
        dispatch(fetchAllMessages(match.id))
        history.push('/conversations')
    }

    setBody("");
  };

  return (
    user && (
      <div
      style={{ background: "red"}}
      >
        <div>
          {messages.map((message, ind) => (
            <div key={ind}>{`${message.body}`}</div>
          ))}
        </div>
        <form onSubmit={sendChat}>
          <input value={body} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  );
};

export default Chat;
