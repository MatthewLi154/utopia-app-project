import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { deletingMessage, fetchAllMessages } from "../../store/message";


function ConversationCard({conversation}){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllMessages(conversation.id))
    }, [conversation.id])

    return (
        <div>
                <p>
                    {conversation.first_name}
                    {conversation.last_name}
                </p>
                
        </div>
    )
}

export default ConversationCard
