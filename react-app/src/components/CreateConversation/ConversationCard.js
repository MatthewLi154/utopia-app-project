import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { deletingMessage, fetchAllMessages } from "../../store/message";
import CreateMessage from "../CreateMessage";
import UpdateMessage from "../UpdateMessageModal";

function ConversationCard({conversation}){
    const dispatch = useDispatch()

    let profile = useSelector((state) => Object.values(state.profiles.user_profiles))
    const findProfile = (id) => profile.find(p => p.user_id === id)
    let singleConversation = useSelector(state => Object.values(state.messages.conversation_messages))


    useEffect(() => {
        dispatch(fetchAllMessages(conversation.id))
    }, [conversation.id])

    let content;
    singleConversation.length && conversation.id === singleConversation[0]?.conversation_id ?
    content = (
        singleConversation.map(m => (
            <div>
            <h4 key={m.id}>
                {m.body}
            </h4>
            <button onClick={e => dispatch(deletingMessage(m.id))}>
                Delete!
            </button>
            <UpdateMessage message={m}/>
            </div>
        ))
        ):
        content = (
            <h4>
                Choose a conversation
            </h4>
        )

    return (
        <div
        onClick={e =>
            (dispatch(fetchAllMessages(conversation.id)),
            e.stopPropagation())}
        >
                <p>
                    {findProfile(conversation.recipient_id)?.first_name}
                    {findProfile(conversation.recipient_id)?.last_name}
                </p>
                <p>
                    {findProfile(conversation.sender_id)?.first_name}
                    {findProfile(conversation.sender_id)?.last_name}
                </p>
                {content}
                <CreateMessage conversation={conversation} singleConversation={singleConversation}/>
        </div>
    )
}

export default ConversationCard
