import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import LoginForm from "./LoginForm";

function LoginFormModal() {
    const [login, setLogin] = useState(false)
    return (
        <>
        <button className="login-button" onClick={() =>
          {console.log(login)
            setLogin(true)
          console.log(login)}
          }>Log In</button>
        {(
            <Modal onClose={() => setLogin(false)}>
                <LoginForm />
            </Modal>
        )}
        </>
    )
}

export default LoginFormModal;
