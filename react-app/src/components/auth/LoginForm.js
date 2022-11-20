import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";
import { useProfile } from "../../context/profileContext";

const LoginForm = ({ setLogin }) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { profileData, setProfileData } = useProfile();

  // Store new profile and drill through each page
  let newProfile = {};
  useEffect(() => {
    newProfile.email = email;
    newProfile.username = username;
    newProfile.password = password;
    localStorage.setItem("hashedProfileData", JSON.stringify(newProfile));
    setProfileData(newProfile);
  }, [email, password, username]);

  const transition = () => {
    const container = document.getElementById("container");

    container.classList.add("right-panel-active");
  };
  const transition2 = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };

  // if (sessionUser) return <Redirect to="/profiles" />;

  // const loginValidate = () => {
  //   const errors = []
  //   const allusers =
  // }
  const validate = () => {
    const errors = [];

    if (password.length === 0) {
      errors.push("Please enter a password");
    } else if (password.length > 20 || password.length < 6) {
      errors.push("Password must be between 6 and 20 characters");
    }

    if (password !== repeatPassword) {
      errors.push("Passwords don't match");
    }

    if (repeatPassword.length === 0) {
      errors.push("Please confirm your password");
    }

    if (username.length === 0) {
      errors.push("Please enter a username");
    } else if (username.length < 4 || username.length > 30) {
      errors.push("Username must be between 4 and 30 characters");
    }

    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.[a-z]{2,3}$/;

    if (email.length === 0) {
      errors.push("Please enter an email address");
    } else if (email.length < 3 || email.length > 256) {
      errors.push("Email must be between 3 and 255 characters");
    } else if (!emailReg.test(email)) {
      errors.push("Please enter a valid email");
    }

    if (errors.length > 0) setErrors(errors);
    setErrors(errors)
    return errors;
  };

  const resetErrors = () => {
    setErrors([])
  }
  const onLogin = async (e) => {

    e.preventDefault();
    const data = await dispatch(sessionActions.login(email, password));
    if (data) {
      const errors = []
      data.forEach(error => {
        const [key, value] = error.split(":")
        errors.push(value)
      })
      return setErrors(errors);
    }
    history.push("/");
  };

  const onSignUp = async (e) => {
    const errors = validate();

    if (errors.length === 0) {
      if (password === repeatPassword) {
        // const data = await dispatch(
        //   sessionActions.signUp(username, email, password)
        // );
        // Instead of creating a user here, we will create it with the profile at the end of profile creation
        // drill information through each page
        // history.push("/profile/create/name");
        return (
          <Redirect
            to={{
              pathname: "/profile/create/name",
              state: { newProfile: newProfile },
            }}
          />
        );
      }
    } else {
      e.preventDefault();
      setErrors(errors);
      return errors;
    }

    // if (password === repeatPassword) {
    //   const data = await dispatch(
    //     sessionActions.signUp(username, email, password)
    //   );
    // }
    //   if (data) {
    //     e.preventDefault();
    //     for (const err of data) {
    //       errors.push(err);
    //     }
    //   } else {
    //     history.push("/profile/create/name");
    //   }
    // }
  };

  // if (sessionUser) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form
          className="form-modal"
        // onClick={(e) => e.stopPropagation()}
        // onSubmit={onSignUp}
        >
          <h1 className="modal-sign-in-header">Create Account</h1>
          <div className="errors-login-modal">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            className="modal-inputs"
          />

          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="modal-inputs"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="modal-inputs"
          />
          <input
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            placeholder="Confirm Password"
            required={true}
            className="modal-inputs"
          />
          <NavLink
            to={{
              pathname: "/profile/create/name",
              state: { newProfile: newProfile },
            }}
          >
            <button
              type="submit"
              className="sign-up"
              onClick={(e) => {
                resetErrors()
                onSignUp(e)}}
            >
              Sign Up
            </button>
          </NavLink>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form
          className="form-modal"
          onClick={(e) => e.stopPropagation()}
          onSubmit={onLogin}
        >
          <h1 className="modal-sign-in-header">Sign in</h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modal-inputs"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="modal-inputs"
          />
          <div className="errors-login-modal">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}</div>
          <button className="sign-up" type="submit">
            Sign In
          </button>
          <button
            className="sign-up"
            onClick={() => {
              resetErrors()
              dispatch(sessionActions.login("demo@aa.io", "password")).then(
                () => setLogin(false)
              );
            }}
          >
            Demo User
          </button>
          <button
            className="sign-up"
            onClick={() => {
              resetErrors()
              dispatch(sessionActions.login("Dion@aa.io", "password")).then(
                () => setLogin(false)
              );
            }}
          >
            Demo User 2
          </button>


        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with your matches, please log in!</p>
            <button onClick={() => {
              resetErrors()
              transition2()}} class="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>
              Enter your personal details and start your journey of meeting
              others on Utopia!
            </p>
            <button onClick={() => {
              resetErrors()
              transition()}} class="ghost" id="signUp">
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
