import { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateMessageForm from "./UpdateMessageForm";

function UpdateMessage({message}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
        <button
        onClick={()  => setShowModal(true)}
        >
            Update
        </button>
        {showModal && <Modal onClose={() => setShowModal(false)}>
            <UpdateMessageForm message={message} setShowModal={setShowModal}/>
        </Modal>
        }
        </div>
    )
}

export default UpdateMessage
