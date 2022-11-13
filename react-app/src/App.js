import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Profile from "./components/profile";
import { authenticate } from "./store/session";
import CreateProfileName from "./components/CreateProfile/CreateProfileName";
import CreateProfileBirthday from "./components/CreateProfile/CreateProfileBirthday";
import CreateProfileLocation from "./components/CreateProfile/CreateProfileLocation";
import CreateProfileBio from "./components/CreateProfile/CreateProfileBio";
import CreateConversation from "./components/CreateConversation"
import SingleUserProfile from "./components/SingleUserProfile";
import PersonalityQuestions from "./components/PersonalityQuestions";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded}/>
      {loaded && (
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/profile/:profileId/personality-questions">
          <PersonalityQuestions />
        </Route>
        <Route path="/profile/create/name">
          <CreateProfileName />
        </Route>
        <Route path="/profile/create/birthday">
          <CreateProfileBirthday />
        </Route>
        <Route exact path="/profile/create/location">
          <CreateProfileLocation />
        </Route>
        <Route exact path="/profile/create/about">
          <CreateProfileBio />
        </Route>
        <Route path="/profile/:profileId">
          <SingleUserProfile />
        </Route>
        <Route path="/profiles">
          <Profile />
        </Route>
        <Route path='/conversations'>
          <CreateConversation/>
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <h1>My Home Page</h1>
        </Route>
      </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
