
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './auth/LoginFormModal';
import SignUpFormModal from './auth/SignUpFormModal';
import { useSelector } from 'react-redux';
import LoginForm from './auth/LoginForm';
import { Modal } from '../context/Modal';
import './NavBar.css'

const NavBar = ({ loaded }) => {
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
              <NavLink to='/' exact={true}>
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
            <Link to='/profiles'>
              <img src='https://i.imgur.com/1kY4QtL.png' alt="default-profile-pic" className='default-profile-pic'></img>
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
          <div className='nav-list-splash'>
            <div className='left-logo'>
              <div>
                <NavLink to='/' exact={true}>
                  <img src='https://i.imgur.com/1kY4QtL.png' alt='logo' className='home-logo'></img>
                </NavLink>
              </div>
            </div>

            <div className='right-nav-items-splash'>
              <div>
                <button className="login-button" onClick={() => {
                  console.log(login)
                  setLogin(true)
                  console.log(login)
                }
                }>Log In</button>
              </div>
              <div>
                <NavLink to='/sign-up' exact={true} className="signup">
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </div>


      </div >
    )
  }
  return (
    <div>
      {loaded && sessionLinks}

        {login && <Modal onClose={() => setLogin(false)}>
          <LoginForm setLogin={setLogin}/>
        </Modal>}

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
