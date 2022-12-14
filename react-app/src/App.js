import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import CreateConversation from "./components/Chat";
import SingleUserProfile from "./components/SingleUserProfile";
import PersonalityQuestions from "./components/PersonalityQuestions";
import CreateProfileOther from "./components/CreateProfile/CreateProfileOther";
import EditProfile from "./components/EditProfile";
import BrowseBar from "./components/BrowseBar";
import ProfileCategory from "./components/ProfileCategories";
import Home from "./components/Home";
import { fetchAllProfiles } from "./store/profile";
import CreaterLinks from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => Object.values(state?.session));

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      // dispatch(fetchAllProfiles());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <Switch> */}
      {/* <Route path=""> */}
      {sessionUser[0] === null ? (
        <Route>
          <Switch>
            <Route exact path="/profile/create/name">
              <CreateProfileName />
            </Route>
            <Route exact path="/profile/create/birthday">
              <CreateProfileBirthday />
            </Route>
            <Route exact path="/profile/create/location">
              <CreateProfileLocation />
            </Route>
            <Route exact path="/profile/create/other">
              <CreateProfileOther />
            </Route>
            <Route exact path="/profile/create/about">
              <CreateProfileBio />
            </Route>
            <Route exact path="/profile/create/other">
              <CreateProfileOther />
            </Route>
            <Route exact path="/">
              <NavBar loaded={loaded}>
                <LoginForm />
              </NavBar>
              <Home />
            </Route>
          </Switch>
        </Route>
      ) : (
        <>
          {loaded && sessionUser[0] !== null && (
            <>
              <NavBar loaded={loaded} />
              <BrowseBar />
              <Switch>
                {/* <Route path="/login" exact={true}>
                      <LoginForm />
                    </Route>
                    <Route path="/sign-up" exact={true}>
                      <SignUpForm />
                    </Route> */}
                <Route path="/profiles/:category">
                  <ProfileCategory />
                </Route>
                <Route path="/profile/:profileId/personality-questions">
                  <PersonalityQuestions />
                </Route>
                <Route exact path="/profile/:profileId/edit">
                  <EditProfile />
                </Route>
                <Route exact path="/profile/:profileId">
                  <SingleUserProfile />
                </Route>
                <Route exact path="/">
                  <Profile />
                </Route>
                <Route path="/conversations">
                  <CreateConversation />
                </Route>
                <ProtectedRoute path="/users" exact={true}>
                  <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path="/users/:userId" exact={true}>
                  <User />
                </ProtectedRoute>
              </Switch>
              <CreaterLinks />
            </>
          )}
        </>
      )}
      {/* </Route> */}
      {/* </Switch> */}
    </BrowserRouter>
  );
}

export default App;
