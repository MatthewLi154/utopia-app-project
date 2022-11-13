import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import * as sessionActions from "../../store/session"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(sessionActions.signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  if (sessionUser) {
    return <Redirect to='/' />;
  }

  return (
    <div className='sign-up-form-modal'>
      <div className='signup-form-header'>
        <h3>Sign Up</h3>
      </div>
    <form onClick={(e) => e.stopPropagation()} onSubmit={onSignUp} className="signup-form-wrapper">
      <h2>Welcome to Utopia</h2>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

        <label>
        <input
          type='text'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        />
          </label>

        <label>
        <input
          type='text'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        </label>
        <label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        </label>
        <label>
        <input
          type='password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          placeholder="Confirm Password"
          required={true}
        />
        </label>
      <button type='submit'>Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
