import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import "./CreateProfileLocation.css";

function CreateProfileLocation() {
  const dispatch = useDispatch();
  const uselocation = useLocation();
  const history = useHistory();
  const newProfile = uselocation.state?.newProfile;

  const [location, setLocation] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  useEffect(() => {
    newProfile.location = location;
    console.log(newProfile);
  }, [location]);

  const onSubmit = async (e) => {};

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
                <label>Location</label>
              </div>
              <div className="location-input-container">
                <input placeholder="Planet Earth"></input>
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
