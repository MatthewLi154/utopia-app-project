import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import { Modal } from "../context/Modal";
import { fetchSingleProfile } from "../store/profile";
import { fetchAllProfiles } from "../store/profile";
import "./NavBar.css";
import ProfileButton from "./profileButton";

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const profile = useSelector((state) =>
    Object.values(state.profiles.user_profiles)
  );
  const [signup, setShowSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();

  let profileExist;
  let profileId;
  let profileImg;
  if (sessionUser) {
    for (const userProfile in profile) {
      if (profile[userProfile].user_id === sessionUser.id) {
        profileExist = true;
        profileId = profile[userProfile].id;
        profileImg = profile[userProfile].img_url1;
      }
    }
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav-bar">
        <ul className="nav-list">
          <div className="left-nav-items">
            <li className="left-nav">
              <NavLink to="/profiles" exact={true}>
                <img
                  src="https://i.imgur.com/G4xDlfp.jpg"
                  alt="logo"
                  className="home-logo"
                ></img>
              </NavLink>
              <NavLink className="discover" to="/profiles" exact={true}>
                Discover
              </NavLink>
              <NavLink className="discover" to="/conversations" exact={true}>
                Messages
              </NavLink>
            </li>
          </div>

          <div className="Right-nav-user">
            <ProfileButton props={{ profileExist, profileId, profileImg }} />
          </div>
        </ul>
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <div className="nav-bar-splash">
          <div className="nav-list-splash">
            <div >
              <div className="left-logo">
              <NavLink to="/" exact={true}>
                <img
                  src="https://i.imgur.com/ipOVSr7.png"
                  alt="logo"
                  className="home-logo"
                ></img>
              </NavLink>
              </div>
            </div>

            <div className='right-nav-items-splash'>
              <div className='right-nav-items-splash-login'>
                <button className="nav-sign-up-button" onClick={() => {
                  setLogin(true)
                }
                }>Join Utopia</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {loaded && sessionLinks}

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

    // <div>
    //   <div>
    //     <LogoutButton />
    //   </div>
    //   <div>
    //     {isLoaded && sessionLinks}
    //   </div>
    // </div>
  );
};

export default NavBar;
