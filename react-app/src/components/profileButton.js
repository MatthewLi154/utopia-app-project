import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from "react-router-dom";
import * as sessionActions from  '../store/session'
import { fetchSingleProfile } from "../store/profile";

function ProfileButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  const profile = useSelector(state => Object.values(state.profiles.user_profiles))

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };
  return (
    <>
      <button onClick={openMenu} className="profile-button">
      <img src={profile[sessionUser.id - 1]?.img_url1} alt="default-profile-pic" className='default-profile-pic'></img>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{sessionUser.username}</li>
          <li>{sessionUser.email}</li>
          <li className="dropdown-button border">
            <NavLink className='account-button' onClick={() => dispatch(fetchSingleProfile(profile[sessionUser.id - 1]?.id))} to={`/profile/${profile[sessionUser.id - 1]?.id}`}>Account</NavLink>
          </li>
          <li className="dropdown-button">
            <button className='logout-button' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton