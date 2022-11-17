import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import "./CreateProfileBirthday.css";

function CreateProfileBirthday() {
  const dispatch = useDispatch();
  const uselocation = useLocation();
  const newProfile = uselocation.state?.newProfile;
  const history = useHistory();

  const [day, setDay] = useState(localStorage.getItem("day") || "");
  const [month, setMonth] = useState(localStorage.getItem("month") || "");
  const [year, setYear] = useState(localStorage.getItem("year") || "");
  // const [birthday, setBirthday] = useState(
  //   localStorage.getItem("birthday") || ""
  // );
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    localStorage.setItem("day", day);
    localStorage.setItem("month", month);
    localStorage.setItem("year", year);
    newProfile.birthday = `${month}-${day}-${year}`;
    console.log(newProfile);
  }, [day, month, year]);

  const validate = () => {
    const validationErrors = [];

    // validations for day
    if (day.length !== 2) {
      validationErrors.push(
        "Please input a valid number for day e.g. 06, 15, 31"
      );
    } else if (isNaN(day)) {
      validationErrors.push(
        "Please input a valid number for day e.g. 06, 15, 31"
      );
    }

    // validations for month
    if (month.length !== 2) {
      validationErrors.push(
        "Please input a valid number month e.g. 01, 06, 12"
      );
    } else if (isNaN(month)) {
      validationErrors.push(
        "Please input a valid number month e.g. 01, 06, 12"
      );
    }

    // if (isNaN(month)) {
    //   validationErrors.push(
    //     "Please input a valid number month e.g. 01, 06, 12"
    //   );
    // }

    if (year.length !== 4) {
      validationErrors.push(
        "Please input a valid number year e.g. 1920, 1988, 2004"
      );
    }

    if (isNaN(year)) {
      validationErrors.push(
        "Please input a valid number year e.g. 1920, 1988, 2004"
      );
    }

    return validationErrors;
  };

  const onSubmit = async (e) => {
    // check for validations
    // if no errors
    // add it to
    // redirect to new profile page
    const validationErrors = validate();

    if (validationErrors.length > 0) {
      e.preventDefault();
      setValidationErrors(validationErrors);
    }
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
              <div>
                {validationErrors &&
                  validationErrors.map((error) => <div>{error}</div>)}
              </div>
              <div className="birthday-input-container">
                <label>Month</label>
                <input
                  placeholder="01"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>
              <div className="birthday-input-container">
                <label>Day</label>
                <input
                  placeholder="01"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                />
              </div>
              <div className="birthday-input-container">
                <label>Year</label>
                <input
                  placeholder="2022"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
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
    </>
  );
}

export default CreateProfileBirthday;
