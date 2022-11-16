import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {createMessage, fetchAllMessages} from "../../store/message"
let socket;

const Chat = ({match}) => {
  const [body, setBody] = useState("");
  const [messages, setMessages] = useState([]);

  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.session.user);


//   const joinRoom = () => {
//     if (match.id !== '' && user.username !== '') {
//       socket.emit('join_room', { user: user.username, match: match.id });
//     }
//   }
// // call on this function when clicking on a versation

    // Redirect to /chat
    // navigate('/chat', { replace: true }); // Add this
  // };



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
    socket.on("last_25_messages", (messageObj) => {
      console.log("Last 25 messages:", (messageObj))
      setMessages((message) => [...messageObj, ...message])
    })
    }
  , [])

  const updateChatInput = (e) => {
    setBody(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();
    socket.emit("chat", { user: user.username, body:body });


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
