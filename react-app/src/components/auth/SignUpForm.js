import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

const SignUpForm = ({ setLogin }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const history = useHistory();

  const transition = () => {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };
  const transition2 = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };

  if (sessionUser) return <Redirect to="/profiles" />;

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(sessionActions.login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  const onSignUp = async (e) => {
    if (password === repeatPassword) {
      const data = await dispatch(
        sessionActions.signUp(username, email, password)
      );
      if (data) {
        setErrors(data);
      }
    }
    history.push("/yes");
  };

  return (
    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <form
          action="#"
          onClick={(e) => e.stopPropagation()}
          onSubmit={onLogin}
        >
          <h1>Sign in</h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="sign-up" type="submit">
            Sign In
          </button>
          <button
            className="sign-up"
            onClick={() => {
              dispatch(sessionActions.login("demo@aa.io", "password")).then(
                () => setLogin(false)
              );
            }}
          >
            {" "}
            Demo User{" "}
          </button>
        </form>
      </div>
      <div class="form-container sign-up-container">
        <form
          action="#"
        >
          <h1>Create Account</h1>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
          />
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          <input
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            placeholder="Confirm Password"
            required={true}
          />
          {/* <NavLink to="/profile/create/name">
            <button></button>
          </NavLink> */}
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>
              Enter your personal details and start your journey of meeting
              others on Utopia!
            </p>
            <button onClick={transition} class="ghost" id="signUp">
              Sign Up
            </button>
          </div>
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with your matches, please log in!</p>
            <button onClick={transition2} class="ghost" id="signIn">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
