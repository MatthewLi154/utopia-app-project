import React from "react";
import { Modal } from '../../context/Modal';
import LoginForm from "./LoginForm";

function LoginFormModal({setLogin, login}) {

    return (
        <>
        {login && (
            <Modal onClose={() => setLogin(false)}>
                <LoginForm setLogin={setLogin}/>
            </Modal>
        )}
        </>
    )
}

export default LoginFormModal;
