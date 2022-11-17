import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createMessage, fetchAllMessages} from "../../store/message"
import UpdateMessage from "../UpdateMessageModal";


const Chat = ({profile, match,socket}) => {
  const [body, setBody] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.session.user);

//   useEffect(() => {
//     dispatch(fetchAllMessages(match?.id))
// }, [dispatch])

  useEffect(() => {
    socket.emit("fetch", {'match': match.id})
    socket.on("chat", (chat) => {
      console.log("recent chat:",chat)
      setMessages((messages) => [...messages, chat.message]);
    });
  }, []);

  useEffect(() => {
    socket.on("last_25_messages", (message_list) => {
      console.log("Last 25 messages:", (message_list))
      setMessages((message) => [...message_list, ...message])
    })
    }
  , [])

  const updateChatInput = (e) => {
    setBody(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();

    const payload = {
      body,
      user_sending_id: user.id
    }

    let newMessage = await dispatch(createMessage(match.id,payload))
    socket.emit("chat", {message: {...newMessage}, room: match.id });
    setBody("");
  };

  return (
    user && (
      <div
      style={{ background: "red"}}
      >
        <div>
          {messages.map((message, ind) => (
            <div key={ind}>
                <div>
              {`${message.body}`}
                </div>
                {user.id === message.user_sending_id && (
                  <div>
                    <UpdateMessage message={message} setMessages={setMessages} match={match} socket={socket}/>
                    <button>Delete</button>
                  </div>
                )}
            </div>
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
