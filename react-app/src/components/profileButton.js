import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../store/session";
import { fetchSingleProfile } from "../store/profile";

function ProfileButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const profile = useSelector((state) =>
    Object.values(state.profiles.user_profiles)
  );

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };


  return (
    <>
      <button onClick={openMenu} className="profile-button">
        {!props.props.profileImg ?
          <img src="https://i.imgur.com/Zqfdy44.png" alt="default-pic" className="default-profile-pic"></img>
          :
        <img
          src={props.props.profileImg}
          alt="default-profile-pic"
          className="default-profile-pic"
        ></img>}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{sessionUser.username}</li>
          <li>{sessionUser.email}</li>
          {props.props.profileId && (
            <li className="dropdown-button border">
              <NavLink
                className="account-button"
                onClick={(e) => {
                  dispatch(fetchSingleProfile(props.props.profileId));
                }}
                to={`/profile/${props.props.profileId}`}
              >
                Account
              </NavLink>
            </li>
          )}
          {!props.props.profileId && (
            <li>
              <NavLink className="account-button" to="/profile/create/name">
                Create Profile
              </NavLink>
            </li>
          )}
          <li className="dropdown-button">
            <button className="logout-button" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
