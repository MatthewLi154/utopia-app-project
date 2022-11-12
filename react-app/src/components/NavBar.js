
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal';
import SignUpFormModal from './auth/SignUpFormModal';
import { useSelector } from 'react-redux';

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user)
  const [signup, setShowSignup] = useState(false)
  const [login, setLogin] = useState(false)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
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
        </ul>
        <div>
        <Link className='Profile-Button' to='/profiles'>
          <img src='https://i.imgur.com/1kY4QtL.png' alt="default-profile-pic" className='default-profile-pic'></img>
        </Link>
        <div className='user-name'>Matthew Li</div>
        </div>
        <div>
          <LogoutButton/>
        </div>
      </div>
    )
  } else {
    sessionLinks = (
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
      </div>
    )
  }
  return (
    <div>
      {sessionLinks}
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
}

export default NavBar;
