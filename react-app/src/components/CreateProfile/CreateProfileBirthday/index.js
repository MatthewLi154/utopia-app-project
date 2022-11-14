import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import "./CreateProfileBirthday.css";

function CreateProfileBirthday() {
  const dispatch = useDispatch();
  const uselocation = useLocation();
  const newProfile = uselocation.state?.newProfile;
  const history = useHistory();

  console.log(newProfile);

  const [birthday, setBirthday] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  useEffect(() => {
    newProfile.birthday = birthday;
    console.log(newProfile);
  }, [birthday]);

  const onSubmit = async (e) => {
    // check for validations
    // if no errors
    // add it to
    // redirect to new profile page
  };

  return (
    <>
      {" "}
      <div className="create-name-main-page-container">
        <div className="create-name-header-container">
          <div className="create-name-center-content">
            <div className="create-name-icon-details">
              <div
                className="create-name-icon"
                onClick={() => {
                  history.push("/profile/create/name");
                }}
              >
                <i className="fa-solid fa-angle-left"></i>
              </div>
              <div className="create-name-icon">
                <i className="fa-regular fa-calendar"></i>
              </div>
              <div className="create-name-details">When is your birthday?</div>
            </div>
          </div>
        </div>
        <div className="create-name-bottom-section-details-container">
          <div className="input-name-container birthday-input">
            <form className="birthday-input">
              <div className="birthday-input-container">
                <label>Month</label>
                <input placeholder="01" />
              </div>
              <div className="birthday-input-container">
                <label>Day</label>
                <input placeholder="01" />
              </div>
              <div className="birthday-input-container">
                <label>Year</label>
                <input placeholder="2022" />
              </div>
            </form>
          </div>
          <div className="create-name-button-container">
            <div className="create-name-button-sub-container">
              <NavLink
                to={{
                  pathname: "/profile/create/location",
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
      {/* <div>
        <h1>When is your birthday?</h1>
        <label>Birthday</label>
        <form>
          <input
            placeholder="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </form>
        <NavLink
          to={{
            pathname: "/profile/create/location",
            state: { newProfile: newProfile },
          }}
        >
          <button onClick={(e) => onSubmit(e)}>Next</button>
        </NavLink>
      </div> */}
    </>
  );
}

export default CreateProfileBirthday;
