import React, { useState, useEffect } from "react";
import { useSelector,  useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { createMessage, fetchAllMessages } from "../../store/message";

function CreateMessage({conversation, singleConversation}){
    const dispatch = useDispatch()
    const history = useHistory()

// NOTE: change so that create message bar does not show if not clicked onto a conversation

    const [body, setBody] = useState('')


    useEffect(() => {
        dispatch(fetchAllMessages(conversation.id))
    }, [conversation.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            body
        }
        let newMessage = await dispatch(createMessage(conversation.id,payload))
        if (newMessage) {
            history.push('/conversations')
        }
        setBody('')
    }

    return (
        <div>
            {/* {content} */}
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

        </div>
    )
}

export default CreateMessage
