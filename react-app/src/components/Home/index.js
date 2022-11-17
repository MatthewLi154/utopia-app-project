import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './home.css'
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { Modal } from "../../context/Modal";

function Home() {
  const [signup, setShowSignup] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <div className="container-fluid main">
      <div className="covertext">
        <div className="col-lg-10">
          <h1 className="title">DATING FOR EVERY SINGLE FANTASY</h1>
          <h3 className="subtitle">A new dating app for all creatures, races, species, and everything in between. Discover your soulmate through Utopia!</h3>
          <div className="explore">
            <button className="sign-up-button" onClick={() => {
              setLogin(true)
            }
            }>Join Utopia</button>
          </div>
        </div>

        <div className="right-img">
          <img src="https://i.imgur.com/92FpnPd.png" alt="home-page"></img>
        </div>
      </div>
      {login && (
        <Modal onClose={() => setLogin(false)}>
          <LoginForm setLogin={setLogin} />
        </Modal>
      )}
      {signup && (
        <Modal onClose={() => setShowSignup(false)}>
          <SignUpForm setShowSignup={setShowSignup} />
        </Modal>
      )}
    </div>
  );
}

export default Home;
