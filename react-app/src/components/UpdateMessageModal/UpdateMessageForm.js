import React, { useState } from "react";
import { useSelector,  useDispatch } from "react-redux";
import { editMessage } from "../../store/message";

function UpdateMessageForm({message, setShowModal}){
    const dispatch = useDispatch()
    const [body, setBody] = useState(message.body || '')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            body
        }
        let updatedMessage = await dispatch(editMessage(message.id, payload))
        if (updatedMessage) {
            setShowModal(false)
        }
        setBody('')
    }

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
