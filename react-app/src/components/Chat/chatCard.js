import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchAllMessages } from "../../store/message";
import Chat from "../Chat/chat";

function ChatCard({ match }) {

    const [selected, setSelected] = useState(false)
    const dispatch = useDispatch();

    const toggleSelect = () => {
        if(selected) setSelected(false)
        setSelected(true)
    }


    return (
        <div
        onClick={() => {
            dispatch(fetchAllMessages(match.id))
            setSelected(!selected)
        }}

        >
        <p>
            {match.first_name}
            {match.last_name}
        </p>
        {selected && (
            <Chat match={match}/>
        )}
        </div>
    );
}

export default ChatCard;
