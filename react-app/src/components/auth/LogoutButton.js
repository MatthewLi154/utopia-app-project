import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import * as sessionActions from '../../store/session'
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout =  (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return <button className='logout' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
