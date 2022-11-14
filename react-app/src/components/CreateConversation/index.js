import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchAllConversations, makeSingleConversation } from "../../store/conversation";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import ConversationCard from "./ConversationCard";
import { fetchAllMessages } from "../../store/message";

function CreateConversation(){
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchAllConversations())
        dispatch(fetchAllProfiles())
        dispatch(makeSingleConversation())
    }, [])


    let conversations = useSelector((state) => Object.values(state.conversations.all_user_conversations))


    // let profile = useSelector((state) => Object.values(state.profiles.user_profiles))
    // const findProfile = (id) => profile.find(p => p.user_id === id)

    // there is a matches table so that we can use a match table slice of state to auto-generate conversations
    // confirm w matt after merge.


    return (
        <div >
            {conversations.map((c) => (
                <ConversationCard key={c.id} conversation={c}
                />
            ))}

        </div>
    )
}

export default CreateConversation
