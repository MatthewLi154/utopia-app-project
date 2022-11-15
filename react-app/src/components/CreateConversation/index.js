import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchAllConversations, makeSingleConversation } from "../../store/conversation";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import ConversationCard from "./ConversationCard";
import { fetchAllMessages } from "../../store/message";
import Chat from '../Chat'

function CreateConversation(){
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchAllConversations())
        dispatch(fetchAllProfiles())
        dispatch(makeSingleConversation())
    }, [])


    let conversations = useSelector((state) => Object.values(state.matches.matchedProfiles))


    return (
        <div >
            {conversations.map((c) => (
                <ConversationCard key={c.id} conversation={c}
                />
            ))}
            <Chat />
        </div>
    )
}

export default CreateConversation
