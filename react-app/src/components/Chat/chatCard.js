import React, { useRef, useState } from "react";
import { useSelector, useDispatch,  } from "react-redux";
import { fetchAllMessages,currentConv } from "../../store/message";
import Chat from "../Chat/chat";


function ChatCard({ match }) {

    const [selected, setSelected] = useState(false)
    const [open, setOpen] = useState()
    
    const current = useSelector(state => state.messages.current)

    const dispatch = useDispatch();



    return (
        <div>
        <p
            onClick={() => {
                dispatch(fetchAllMessages(match.id))
                dispatch(currentConv(match.id))
                setSelected(!selected)
            }}
        >
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
