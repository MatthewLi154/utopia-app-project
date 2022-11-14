import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./CreateProfileName.css";

function CreateProfileName() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  let newProfile = {};
  useEffect(() => {
    newProfile.name = name;
  }, [name]);

  const onSubmit = async (e) => {
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
                  history.push("/profiles");
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
