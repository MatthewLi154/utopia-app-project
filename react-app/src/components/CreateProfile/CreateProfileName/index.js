import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "./CreateProfileName.css";
import { useProfile } from "../../../context/profileContext";

function CreateProfileName() {
  const dispatch = useDispatch();
  const history = useHistory();
  const uselocation = useLocation();

  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [validationErrors, setValidationErrors] = useState([]);
  const newProfile = uselocation.state?.newProfile;
  const { profileData, setProfileData } = useProfile();

  useEffect(() => {
    if (newProfile) {
      newProfile.name = name;
    }
    localStorage.setItem("name", name);
  }, [name]);

  const validate = () => {
    const validationErrors = [];

    if (!name.includes(" ")) {
      validationErrors.push(
        "Please enter a first and last name only. e.g John Smith"
      );
    }

    if (name.length < 3) {
      validationErrors.push("Name must be more than 3 characters long.");
    }

    if (name.length > 55) {
      validationErrors.push("Name must be 55 characters or less.");
    }
    return validationErrors;
  };

  const onSubmit = async (e) => {
    setValidationErrors([]);
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      e.preventDefault();
      return setValidationErrors(validationErrors);
    }
    // check for validations
    // if no errors
    // add it to
    // redirect to new profile page
  };

  return (
    <>
      <div className="create-name-main-page-container">
        <div className="create-name-header-container">
          <div className="create-name-center-content">
            <div className="create-name-icon-details">
              <div
                className="create-name-icon"
                onClick={() => {
                  history.push("/");
                }}
              >
                <i className="fa-solid fa-angle-left"></i>
              </div>
              <div className="create-name-icon">
                <i className="fa-solid fa-file-signature"> </i>
              </div>
              <div className="create-name-details">Who are you?</div>
            </div>
          </div>
        </div>
        <div className="create-name-bottom-section-details-container">
          <div className="input-name-container">
            <div>
              <label>Name</label>
            </div>
            <form>
              <input
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {validationErrors &&
                validationErrors.map((error) => (
                  <div className="create-name-error-div">{error}</div>
                ))}
            </form>
          </div>
          <div className="create-name-button-container">
            <div className="create-name-button-sub-container">
              <NavLink
                to={{
                  pathname: "/profile/create/birthday",
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

export default CreateProfileName;
