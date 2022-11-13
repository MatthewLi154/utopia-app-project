import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import * as sessionActions from "../../store/session"

const LoginForm = ({setLogin}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  if(sessionUser) return (
    <Redirect to="/"/>
  )

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(sessionActions.login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  if (sessionUser) {
    return <Redirect to='/' />;
  }



  return (
    <div className='login-modal'>
      <h1 id='Log-in'>Log In</h1>
      <h2 id='login-welcome'> Welcome to Utopia</h2>
    <form className='login-form-container' onClick={e => e.stopPropagation()} onSubmit={onLogin}>

        {errors.map((error, ind) => (
          <li key={ind}>{error}</li>
        ))}

        <label>
        <input
          className='login-input'
          type='text'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        </label>

        <label>
        <input
          className='login-input'
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        </label>
        <button className='log-in-button' type='submit'>Log  In</button>
        <button className='Demo-User-Button'
        onClick={() => {dispatch(sessionActions.login(
          "demo@aa.io",
          "password"
        )).then(() => setLogin(false)) }}
        > Demo User </button>
    </form>
    </div>
  );
};

export default LoginForm;
