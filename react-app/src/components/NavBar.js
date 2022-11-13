
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal';
import SignUpFormModal from './auth/SignUpFormModal';
import { useSelector } from 'react-redux';
import './NavBar.css'

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
            <li className='left-nav'>
              <NavLink  to='/' exact={true}>
                <img src='https://i.imgur.com/TTcEnHK.png' alt='logo' className='home-logo'></img>
              </NavLink>
              <NavLink className="discover" to='/profiles' exact={true}>
                Discover
              </NavLink>
              <NavLink className="discover" to='/messages' exact={true}>
                Messages
              </NavLink>
            </li>
          </div>

        <div className='Right-nav-user'>
          <Link  to='/profiles'>
            <img  src='https://i.imgur.com/1kY4QtL.png' alt="default-profile-pic" className='default-profile-pic'></img>
          </Link>
          <div className='user-name'>Matthew Li</div>
        <div>
          <LogoutButton />
        </div>
        </div>
        </ul>
      </div>
    )
  } else {
    sessionLinks = (
      <div>
        <div className='nav-bar-splash'>
        <ul className='nav-list-splash'>
          <div className='left-logo'>
            <li>
              <NavLink to='/' exact={true}>
                <img src='https://i.imgur.com/1kY4QtL.png' alt='logo' className='home-logo'></img>
              </NavLink>
              </li>
              </div>

      <div className='right-nav-items-splash'>
        <li>
          <NavLink to='/login' exact={true} className="login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} className="signup">
            Sign Up
          </NavLink>
        </li>
        </div>
        </ul>
      </div>
      </div >
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
