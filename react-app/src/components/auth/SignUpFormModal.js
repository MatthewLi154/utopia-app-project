import React from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

function SignUpFormModal({ setShowSignup, signup }) {
    return (
        <>
            {signup && (
                <Modal onClose={() => setShowSignup(false)}>
                    <SignUpForm setShowSignup={setShowSignup} />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal
