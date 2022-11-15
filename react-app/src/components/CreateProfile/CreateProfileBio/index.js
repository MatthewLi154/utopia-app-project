import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { createProfile, fetchAllProfiles } from "../../../store/profile";
import "./CreateProfileBio.css";

function CreateProfileBio() {
  const dispatch = useDispatch();
  const uselocation = useLocation();

  const newProfile = uselocation.state?.newProfile;
  const currentUserId = useSelector((state) => state?.session.user.id);

  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [currentGoals, setCurrentGoals] = useState(
    localStorage.getItem("currentGoals"),
    ""
  );
  const [validationErrors, setValidationErrors] = useState("");

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, []);

  useEffect(() => {
    newProfile.bio = bio;
    newProfile.currentGoals = currentGoals;
    localStorage.setItem("bio", bio);
    localStorage.setItem("currentGoals", currentGoals);
    console.log(newProfile);
  }, [bio, currentGoals]);

  const validate = () => {
    const validationErrors = [];

    if (bio.length === 0) {
      validationErrors.push("Please enter a bio");
    } else if (bio.length < 30) {
      validationErrors.push("Please enter at least 30 characters for bio");
    } else if (bio.length > 255) {
      validationErrors.push("Must use less tha 255 characters for bio");
    }

    if (currentGoals.length === 0) {
      validationErrors.push("Please enter some goals");
    } else if (currentGoals.length < 30) {
      validationErrors.push(
        "Please enter at least 30 characters for current goals"
      );
    } else if (currentGoals.length > 255) {
      validationErrors.push(
        "Must use less tha 255 characters for current goals"
      );
    }

    return validationErrors;
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    // check for validations
    const validationErrors = validate();

    if (validationErrors.length > 0) {
      e.preventDefault();
      setValidationErrors(validationErrors);
    }
    // if no errors

    // use newProfile data and send the post request to create new profile
    // new profile needs
    // user_id, first_name, last_name, birthday, location, bio, identify_as, looking_for, languages, kids, hobbies, pets
    // img_url, score (later)
    let firstName, lastName;
    [firstName, lastName] = newProfile.name.split(" ");

    // const data = {
    //   user_id: currentUserId,
    //   first_name: firstName,
    //   last_name: lastName,
    //   birthday: newProfile.birthday,
    //   bio: newProfile.bio,
    //   languages: newProfile.languages,
    //   kids: newProfile.kids,
    //   pets: newProfile.pets,
    //   hobbies: newProfile.hobbies,
    //   location: newProfile.location,
    //   identify_as: newProfile.identifyAs,
    //   looking_for: newProfile.lookingFor,
    //   img_url: newProfile.imgUrl,
    // };

    // dispatch(addProfile(data));
    // dispatch(createProfile(data));

    // use thunk to fetch request to add data to profile db
    // use thunk to update profile state with new profile and set single profile to new profile

    // redirect to new profile page
  };

  return (
    <>
      <div className="create-name-main-page-container">
        <div className="create-name-header-container">
          <div className="create-name-center-content">
            <div className="create-name-icon-details">
              <div className="create-name-icon">
                <NavLink
                  to={{
                    pathname: "/profile/create/location",
                    state: { newProfile: newProfile },
                  }}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </NavLink>
              </div>
              <div className="create-name-icon">
                <i class="fa-solid fa-circle-user"></i>
              </div>
              <div className="create-name-details">About me</div>
            </div>
          </div>
        </div>
        <div className="create-name-bottom-section-details-container">
          <div className="input-name-container birthday-input">
            <div>
              {validationErrors &&
                validationErrors.map((error) => <div>{error}</div>)}
            </div>
            <form className="birthday-input">
              <div className="input-content-container">
                <div className="text-area-container">
                  <div>
                    <label>Biography</label>
                  </div>
                  <div>
                    <textarea
                      placeholder="Please use at least 30 characters"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="text-area-container">
                  <div>
                    <label>Current Goals</label>
                  </div>
                  <div>
                    <textarea
                      placeholder="Now tell us about your current goals..."
                      value={currentGoals}
                      onChange={(e) => setCurrentGoals(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="create-name-button-container">
            <div className="create-name-button-sub-container">
              <NavLink
                to={{
                  pathname: "/profile/create/other",
                  state: { newProfile: newProfile },
                }}
              >
                <button
                  className="create-name-button"
                  onClick={(e) => onSubmit(e)}
                >
                  Next
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProfileBio;
