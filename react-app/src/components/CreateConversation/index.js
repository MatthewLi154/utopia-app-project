import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchAllConversations } from "../../store/conversation";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";

function CreateConversation(){
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchAllConversations())
        dispatch(fetchAllProfiles())
    }, [])


    let conversations = useSelector((state) => Object.values(state.conversations.all_user_conversations))
    let profile = useSelector((state) => Object.values(state.profiles.user_profiles))

    const findProfile = (id) => profile.find(p => p.user_id === id)

    // NOTE: we need to make the first name and last name a link/button that leads you to that
    // conversation's messages

    // there is a matches table so that we can use a match table slice of state to auto-generate conversations
    // confirm w matt after merge.


    return (
        <div>
            {conversations.map((c ) => (
                <div key={c.id}>
                <p>
                    {findProfile(c.recipient_id).first_name}
                    {findProfile(c.recipient_id).last_name}
                </p>
                <p>
                    {findProfile(c.sender_id).first_name}
                    {findProfile(c.sender_id).last_name}
                </p>
                </div>
            ))}
        </div>
    )
}

export default CreateConversation
