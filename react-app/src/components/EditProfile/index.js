import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory, useLocation } from "react-router-dom";
import {
  fetchSingleProfile,
  fetchAllProfiles,
  editSingleProfile,
} from "../../store/profile";
import "./EditProfile.css";

function EditProfile() {
  const { profileId } = useParams();
  const uselocation = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const editProfileData = uselocation.state?.editProfileData;

  const [bio, setBio] = useState(
    localStorage.getItem("bio") || editProfileData.bio
  );
  const [current_goals, setCurrent_goals] = useState(
    localStorage.getItem("current_goals") || editProfileData.current_goals
  );
  const [location, setLocation] = useState(
    localStorage.getItem("location") || editProfileData.location
  );
  const [languages, setLanguages] = useState(
    localStorage.getItem("languages") || editProfileData.languages
  );
  const [identify_as, setIdentify_as] = useState(
    localStorage.getItem("identify_as") || editProfileData.identify_as
  );
  const [looking_for, setLooking_for] = useState(
    localStorage.getItem("looking_for") || editProfileData.looking_for
  );
  const [pets, setPets] = useState(
    localStorage.getItem("pets") || editProfileData.pets
  );
  const [kids, setKids] = useState(
    localStorage.getItem("kids") || editProfileData.kids
  );
  const [hobbies, setHobbies] = useState(
    localStorage.getItem("hobbies") || editProfileData.hobbies
  );
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleProfile(profileId));
    dispatch(fetchAllProfiles());
  }, []);

  let data = {};

  useEffect(() => {
    data = {
      bio,
      current_goals,
      location,
      languages,
      identify_as,
      looking_for,
      pets,
      kids,
      hobbies,
    };
    localStorage.setItem("bio", bio);
    localStorage.setItem("current_goals", current_goals);
    localStorage.setItem("location", location);
    localStorage.setItem("languages", languages);
    localStorage.setItem("identify_as", identify_as);
    localStorage.setItem("looking_for", looking_for);
    localStorage.setItem("pets", pets);
    localStorage.setItem("kids", kids);
    localStorage.setItem("hobbies", hobbies);
  }, [
    bio,
    current_goals,
    location,
    languages,
    identify_as,
    looking_for,
    pets,
    kids,
    hobbies,
  ]);

  const validate = () => {
    const validationErrors = [];
    if (bio.length === 0) {
      validationErrors.push("Please enter a bio");
    } else if (bio.length < 30) {
      validationErrors.push("Please enter at least 30 characters for bio");
    } else if (bio.length > 255) {
      validationErrors.push("Must use less tha 255 characters for bio");
    }

    if (current_goals.length === 0) {
      validationErrors.push("Please enter some goals");
    } else if (current_goals.length < 30) {
      validationErrors.push(
        "Please enter at least 30 characters for current goals"
      );
    } else if (current_goals.length > 255) {
      validationErrors.push(
        "Must use less than 255 characters for current goals"
      );
    }

    if (pets.length > 30) {
      validationErrors.push("Muist use less than 30 characters for pets");
    }

    if (location.length > 55) {
      validationErrors.push("Location must be 55 characters or less");
    } else if (location.length < 3) {
      validationErrors.push("Location must be 2 or more characters");
    }

    if (languages.length === 0) {
      validationErrors.push("Please enter at least one language");
    } else if (languages.length > 30) {
      validationErrors.push("Please use less than 30 characters for languages");
    }

    // validations for hobbies
    if (hobbies.length === 0) {
      validationErrors.push("Please enter at least one hobby");
    } else if (hobbies.length > 30) {
      validationErrors.push("Please use less than 30 characters for hobbies");
    }

    return validationErrors;
  };

  const onSubmit = async (e) => {
    const validationErrors = validate();

    if (validationErrors.length > 0) {
      e.preventDefault();
      return setValidationErrors(validationErrors);
    }

    dispatch(editSingleProfile(data, profileId));
    dispatch(fetchSingleProfile(profileId));

    localStorage.clear();

    history.push(`/profile/${profileId}`);
  };

  return (
    <>
      {editProfileData && (
        <div className="main-edit-profile-container">
          <div className="edit-profile-header">
            <div className="edit-profile-header-content">
              <div className="edit-profile-image-details">
                <div className="profile-image-container">
                  <img src={editProfileData.img_url1}></img>
                </div>
                <div className="profile-details-container">
                  <div className="profile-name-container">
                    {editProfileData.first_name}
                  </div>
                  <div>
                    {editProfileData.location} • {editProfileData.age}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="edit-profile-body">
            <div className="edit-bio-container">
              <div className="edit-bio-upper">
                <label>ABOUT ME</label>
                <label>My self-summary</label>
              </div>
              <div className="edit-bio-lower">
                <div className="bio-box">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="edit-bio-container">
              <div className="edit-bio-upper">
                <label>ASPIRATIONS</label>
                <label>Current Goal</label>
              </div>
              <div className="edit-bio-lower">
                <div>
                  <textarea
                    value={current_goals}
                    onChange={(e) => setCurrent_goals(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="edit-bio-container">
              <div className="edit-bio-upper">
                <label>LOCATION</label>
                <label>My Domain</label>
              </div>
              <div className="edit-bio-lower">
                <div>
                  <textarea
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="edit-bio-container">
              <div className="edit-bio-upper">
                <label>LANGUAGES</label>
                <label>Communication skills</label>
              </div>
              <div className="edit-bio-lower">
                <div>
                  <textarea
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="edit-bio-container">
              <div className="edit-bio-upper">
                <label>IDENTITY</label>
                <label>I am...</label>
              </div>
              <div className="edit-bio-lower">
                <div>
                  <textarea
                    value={identify_as}
                    onChange={(e) => setIdentify_as(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="edit-bio-container">
              <div className="edit-bio-upper">
                <label>LOOKING FOR</label>
                <label>Compatible with...</label>
              </div>
              <div className="edit-bio-lower">
                <div>
                  <textarea
                    value={looking_for}
                    onChange={(e) => setLooking_for(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="edit-bio-container">
              <div className="edit-bio-upper">
                <label>KIDS</label>
                <label>My take...</label>
              </div>
              <div className="edit-bio-lower">
                <div>
                  <textarea
                    value={kids}
                    onChange={(e) => setKids(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="edit-bio-container">
              <div className="edit-bio-upper">
                <label>PETS</label>
                <label>Have...</label>
              </div>
              <div className="edit-bio-lower">
                <div>
                  <textarea
                    value={pets}
                    onChange={(e) => setPets(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="edit-bio-container">
              <div className="edit-bio-upper">
                <label>HOBBIES</label>
                <label>In my free time...</label>
              </div>
              <div className="edit-bio-lower">
                <div>
                  <textarea
                    value={hobbies}
                    onChange={(e) => setHobbies(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            {validationErrors &&
              validationErrors.map((error) => <div>{error}</div>)}

            <div>
              <button
                onClick={(e) => onSubmit(e)}
                className="save-button-container"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
