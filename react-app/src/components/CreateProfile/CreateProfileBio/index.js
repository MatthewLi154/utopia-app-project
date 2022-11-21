import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { createProfile, fetchAllProfiles } from "../../../store/profile";
import "./CreateProfileBio.css";

function CreateProfileBio() {
  const dispatch = useDispatch();
  const uselocation = useLocation();

  const newProfile = uselocation.state?.newProfile;
  // const currentUserId = useSelector((state) => state?.session.user.id);

  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [currentGoals, setCurrentGoals] = useState(
    localStorage.getItem("currentGoals") || ""
  );
  const [validationErrors, setValidationErrors] = useState("");

  useEffect(() => {
    newProfile.bio = bio;
    newProfile.currentGoals = currentGoals;
    localStorage.setItem("bio", bio);
    localStorage.setItem("currentGoals", currentGoals);
  }, [bio, currentGoals]);

  const validate = () => {
    const validationErrors = [];

    if (bio.length === 0) {
      validationErrors.push("Please enter at least 10 characters for bio");
    } else if (bio.length < 10) {
      validationErrors.push("Please enter at least 10 characters for bio");
    } else if (bio.length > 255) {
      validationErrors.push("Must use less tha 255 characters for bio");
    }

    if (currentGoals.length === 0) {
      validationErrors.push("Please enter some goals that you have");
    } else if (currentGoals.length < 10) {
      validationErrors.push(
        "Please enter at least 10 characters for current goals"
      );
    } else if (currentGoals.length > 255) {
      validationErrors.push(
        "Must use less tha 255 characters for current goals"
      );
    }

    return validationErrors;
  };

  const onSubmit = async (e) => {
    // check for validations
    const validationErrors = validate();

    if (validationErrors.length > 0) {
      e.preventDefault();
      return setValidationErrors(validationErrors);
    }
    // history.push("/profile/create/other");
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
            <form className="birthday-input">
              <div className="errors-bio-container">
                {validationErrors &&
                  validationErrors.map((error) => (
                    <div className="create-name-error-div error-bio-container">
                      {error}
                    </div>
                  ))}
              </div>
              <div className="input-content-container">
                <div className="text-area-container">
                  <div>
                    <label>Biography</label>
                  </div>
                  <div>
                    <textarea
                      placeholder="Please use at least 10 characters"
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
                      placeholder="Now tell us about your current goals...using at least 10 characters"
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
