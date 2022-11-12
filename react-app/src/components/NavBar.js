
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal';
import SignUpFormModal from './auth/SignUpFormModal';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [signup, setShowSignup] = useState(false)
  const [login, setLogin] = useState(false)

  let sessionLinks;
  return (
    <div className='nav-bar'>
      <ul className='nav-list'>
        <div className='left-nav-items'>
          <li>
            <NavLink to='/' exact={true}>
              <img src='https://i.imgur.com/1kY4QtL.png' alt='logo' className='home-logo'></img>
            </NavLink>
            <NavLink to='/profiles' exact={true}>
              Discover
            </NavLink>
            <NavLink to='/messages' exact={true}>
              Messages
            </NavLink>

          </li>
        </div>
        <div className='right-nav-items'>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </div>

      </ul>
    </div>
  );
}

export default NavBar;
