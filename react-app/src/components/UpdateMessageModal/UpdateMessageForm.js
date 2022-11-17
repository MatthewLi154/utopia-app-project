import React, { useState, useEffect } from "react";
import { useSelector,  useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editMessage, fetchAllMessages } from "../../store/message";

function UpdateMessageForm({message, setMessages, showModal, setShowModal, match, socket}){
    const dispatch = useDispatch()
    const [validateErrors, setValidateErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [body, setBody] = useState(message.body || '')



     useEffect(() => {
       const errors = {};
       if (body.length === 0)
         errors.body = "Oops you need to send your match something";
       if (body.length > 100) errors.body = "Oh no this is too long, TLDR";
       setValidateErrors(errors);
     }, [body]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(validateErrors).length > 0) return;
        const payload = {
            body,
            user_sending_id: message.user_sending_id
        }
        let updatedMessage = await dispatch(editMessage(message.id, payload))

        if (updatedMessage && Object.keys(validateErrors).length === 0) {
          setShowModal(false);
          setHasSubmitted(false);
          socket.emit("fetch", { match: match.id });
          socket.on("last_25_messages", (message_list) => {
            console.log("Last 25 messages:", message_list);
            setMessages([...message_list]);
          });
        }

        setBody('')
        setValidateErrors({});
    }

    useEffect(() => {
        return () => {};
    }, []);

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {hasSubmitted && validateErrors.body && <li>{validateErrors.body}</li>}
        <button type="submit">Submit</button>
      </form>
    );
}

export default UpdateMessageForm
