import React, { useState, useEffect } from "react";
import { useSelector,  useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editMessage, fetchAllMessages } from "../../store/message";

function UpdateMessageForm({message, setMessages, showModal, setShowModal, match, socket}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [body, setBody] = useState(message.body || '')


    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            body,
            user_sending_id: message.user_sending_id
        }
        let updatedMessage = await dispatch(editMessage(message.id, payload))

        if (updatedMessage) {
            setShowModal(false)
            socket.emit("fetch", {'match': match.id})
                socket.on("last_25_messages", (message_list) => {
                console.log("Last 25 messages:", (message_list))
                setMessages([...message_list])
                })
        }
        setBody('')
    }

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <input
            type = 'text'
            value = {body}
            onChange = {e => setBody(e.target.value)}
            />
            <button
            type = 'submit'
            >
                Submit
            </button>
        </form>
    )
}

export default UpdateMessageForm
