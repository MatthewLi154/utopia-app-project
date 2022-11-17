import { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateMessageForm from "./UpdateMessageForm";

function UpdateMessage({message, setMessages, match, socket}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
        <button
        onClick={()  => setShowModal(true)}
        >
            Update
        </button>
        {showModal && <Modal onClose={() =>
            setShowModal(false)}>
            <UpdateMessageForm message={message} setMessages={setMessages} showModal={showModal} setShowModal={setShowModal} match={match} socket={socket}/>
        </Modal>
        }
        </div>
    )
}

export default UpdateMessage
