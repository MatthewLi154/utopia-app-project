import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import "./CreateProfileLocation.css";

function CreateProfileLocation() {
  const dispatch = useDispatch();
  const uselocation = useLocation();
  const history = useHistory();
  const newProfile = uselocation.state?.newProfile;

  const [location, setLocation] = useState(
    localStorage.getItem("location") || ""
  );
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    newProfile.location = location;
    localStorage.setItem("location", location);
  }, [location]);

  const validate = () => {
    let validationErrors = [];

    if (location.length > 55) {
      validationErrors.push("Location must be 55 characters or less");
    } else if (location.length < 3) {
      validationErrors.push("Location must be 2 or more characters");
    }

    return validationErrors;
  };

  const onSubmit = async (e) => {
    const validationErrors = validate();

    if (validationErrors.length > 0) {
      e.preventDefault();
      setValidationErrors(validationErrors);
    }
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
                    pathname: "/profile/create/birthday",
                    state: { newProfile: newProfile },
                  }}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </NavLink>
              </div>
              <div className="create-name-icon">
                <i className="fa-regular fa-calendar"></i>
              </div>
              <div className="create-name-details">Where are you from?</div>
            </div>
          </div>
        </div>
        <div className="create-name-bottom-section-details-container">
          <div className="input-name-container birthday-input">
            <form className="birthday-input">
              <div>
                {validationErrors &&
                  validationErrors.map((error) => <div>{error}</div>)}
              </div>
              <div>
                <label>Location</label>
              </div>
              <div className="location-input-container">
                <input
                  placeholder="Planet Earth"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                ></input>
              </div>
            </form>
          </div>
          <div className="create-name-button-container">
            <div className="create-name-button-sub-container">
              <NavLink
                to={{
                  pathname: "/profile/create/about",
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

export default CreateProfileLocation;
