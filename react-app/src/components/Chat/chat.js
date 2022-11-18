import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createMessage,deletingMessage} from "../../store/message"
import UpdateMessage from "../UpdateMessageModal";
import './chat.css'


const Chat = ({socket}) => {
  const [body, setBody] = useState("");
  const [validateErrors, setValidateErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [style, setStyle] = useState({display: 'none'})

  const scrollRef = useRef(null)

  const dispatch = useDispatch()

  const matches = useSelector((state) => Object.values(state.messages.matches));
  const profile = useSelector(state => state.profiles.singleProfile)

  const user = useSelector((state) => state.session.user);
  const match = matches.find(
    (match) =>
      profile.id === match.profile_id || profile.id === match.matched_profile_id
  );

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
      setMessages([...message_list])
    })
    }
  , [])

  useEffect(() => {
   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  useEffect(() => {
    const errors = {}
    if(body.length === 0) errors.body = 'Oops you need to send your match something'
    if(body.length > 100) errors.body = 'Oh no this is too long, TLDR'
    setValidateErrors(errors)
  }, [body])

  const updateChatInput = (e) => {
    setBody(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    if(Object.keys(validateErrors).length > 0) return

    const payload = {
      body,
      user_sending_id: user.id
    }

    let newMessage = await dispatch(createMessage(match.id,payload))
    if (newMessage && Object.keys(validateErrors).length === 0) {
      socket.emit("chat", { message: { ...newMessage }, room: match.id });
      setHasSubmitted(false)
    }


    setBody("");
    setValidateErrors({})
  };

  const deleteMessage = async(id) => {
      await dispatch(deletingMessage(id))
      socket.emit("fetch", {'match': match.id})
      socket.on("last_25_messages", (message_list) => {
          console.log("deleting recent message", (message_list))
          setMessages([...message_list])
      })
  }



  return (
    user && (
      <div className="chat_box">
        <div
        className="message_box"
        >
          {messages.map((message, ind) => (
            <div key={ind}>
              <div
                className={
                  message.user_sending_id === user.id
                    ? "chat_message my_messages"
                    : "chat_message other_messages"
                }
                onMouseEnter={(e) =>
                  message.user_sending_id === user.id
                    ? setStyle({ display: "flex" })
                    : null
                }
                onMouseLeave={(e) => {
                  setStyle({ display: "none" });
                }}
              >
                <p>{message.body}</p>
                {user.id === message.user_sending_id && (
                  <div className="message_buttons" style={style}>
                    <UpdateMessage
                      message={message}
                      setMessages={setMessages}
                      match={match}
                      socket={socket}
                    />
                    <button onClick={() => deleteMessage(message.id)}>
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={scrollRef}/>
        </div>
        <form className="chat_form" onSubmit={sendChat}>
          <div
          className={hasSubmitted && validateErrors.body ?
            "input_container error" :
            "input_container"}
          >
            <input type="text" value={body} onChange={updateChatInput} />
            <span>
              {hasSubmitted && validateErrors.body
                ? validateErrors.body
                : "Your Honey is Waiting"}
            </span>
            <div
            className="chat_counter">
              {hasSubmitted && validateErrors.body ?
              <i class="fa-regular fa-face-frown"></i> :
              `${body.length}/100`}
              </div>
          </div>
          <button
          className="chat_submit"
          type="submit">
            {hasSubmitted && validateErrors.body ?
            <i class="fa-solid fa-x"></i> :
            <i class="fa-solid fa-arrow-up"></i>
            }
          </button>
        </form>
      </div>
    )
  );
};


export default Chat;
