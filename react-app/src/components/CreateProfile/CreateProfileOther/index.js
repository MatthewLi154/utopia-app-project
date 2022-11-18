import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import {
  createProfile,
  fetchAllProfiles,
  getUserProfiles,
} from "../../../store/profile";
import * as sessionActions from "../../../store/session";
import { useProfile } from "../../../context/profileContext";
import "./CreateProfileOther.css";

function CreateProfileOther() {
  const dispatch = useDispatch();
  const uselocation = useLocation();
  const history = useHistory();

  const [submitted, setSubmitted] = useState(1);
  const [userIdData, setUserIdData] = useState({});

  const profileDataStorage = localStorage.getItem("hashedProfileData");
  const newProfile = uselocation.state?.newProfile;

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, []);

  // const currentUserId = useSelector((state) => state?.session.user.id);
  const profiles = useSelector((state) => state.profiles.user_profiles);
  const { profileData, setProfileData } = useProfile();

  const [languages, setLanguages] = useState(
    localStorage.getItem("languages") || ""
  );
  const [pets, setPets] = useState(localStorage.getItem("pets") || "");
  const [hobbies, setHobbies] = useState(localStorage.getItem("hobbies") || "");
  const [identifyAs, setIdentifyAs] = useState(
    localStorage.getItem("identifyAs") || ""
  );
  const [lookingFor, setLookingFor] = useState(
    localStorage.getItem("lookingFor") || ""
  );
  const [kids, setKids] = useState(localStorage.getItem("kids") || "");
  const [imgUrl1, setImgUrl1] = useState(
    localStorage.getItem("imageUrl1") || ""
  );
  const [imgUrl2, setImgUrl2] = useState(
    localStorage.getItem("imageUrl2") || null
  );
  const [imgUrl3, setImgUrl3] = useState(
    localStorage.getItem("imageUrl3") || null
  );
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(async () => {
    if (submitted) {
      const signUpData = {
        username: JSON.parse(profileDataStorage).username,
        email: JSON.parse(profileDataStorage).email,
        password: JSON.parse(profileDataStorage).password,
      };
      console.log(signUpData);
      await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      console.log(newUserSignUp);
      // console.log(JSON.parse(profileDataStorage).email);

      await fetch(`/api/users/email/${JSON.parse(profileDataStorage).email}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setUserIdData(data);
        });
      console.log(userIdData);
      if (userIdData) {
        // MAKE THE PROFILE
        let firstName, lastName;
        [firstName, lastName] = newProfile.name.split(" ");

        const newUserId = userIdData.id;

        const data = {
          user_id: newUserId,
          first_name: firstName,
          last_name: lastName,
          birthday: newProfile.birthday,
          bio: newProfile.bio,
          current_goals: newProfile.currentGoals,
          languages: newProfile.languages,
          kids: newProfile.kids,
          pets: newProfile.pets,
          hobbies: newProfile.hobbies,
          location: newProfile.location,
          identify_as: newProfile.identifyAs,
          looking_for: newProfile.lookingFor,
          img_url1: newProfile.imgUrl1,
          img_url2: newProfile.imgUrl2,
          img_url3: newProfile.imgUrl3,
        };

        let newCreatedProfile = await dispatch(createProfile(data));
        const anotherNewCreatedProfile = await dispatch(fetchAllProfiles());
        console.log(anotherNewCreatedProfile);

        let profileId;
        for (const profile in anotherNewCreatedProfile) {
          if (anotherNewCreatedProfile[profile].user_id === newUserId) {
            profileId = profile;
            console.log(profileId);
          }
        }
        if (profileId) {
          const logindata = await dispatch(
            sessionActions.login(
              JSON.parse(profileDataStorage).email,
              JSON.parse(profileDataStorage).password
            )
          );
          localStorage.clear();
          return history.push(`/profile/${profileId}`);
        }
      }
    }
    // setSubmitted(false);
  }, [submitted, setSubmitted]);

  useEffect(() => {
    newProfile.languages = languages;
    newProfile.pets = pets;
    newProfile.hobbies = hobbies;
    newProfile.kids = kids;
    newProfile.identifyAs = identifyAs;
    newProfile.lookingFor = lookingFor;
    newProfile.imgUrl1 = imgUrl1;
    newProfile.imgUrl2 = imgUrl2;
    newProfile.imgUrl3 = imgUrl3;
    localStorage.setItem("pets", pets);
    localStorage.setItem("hobbies", hobbies);
    localStorage.setItem("kids", kids);
    localStorage.setItem("languages", languages);
    localStorage.setItem("identifyAs", identifyAs);
    localStorage.setItem("lookingFor", lookingFor);
    localStorage.setItem("imgUrl1", imgUrl1);
    localStorage.setItem("imgUrl2", imgUrl2);
    localStorage.setItem("imgUrl3", imgUrl3);
    // console.log(profileDataStorage);
    // console.log(newProfile);
  }, [languages, pets, hobbies, kids, imgUrl1, imgUrl2, imgUrl3]);

  const validate = () => {
    const validationErrors = [];
    const languagesArr = languages.split(" ");
    // validations for langauges
    if (languages.length === 0) {
      validationErrors.push("Please enter at least one language");
    } else if (languages.length > 255) {
      validationErrors.push(
        "Please use less than 255 characters for languages"
      );
    }

    // validations for hobbies
    if (hobbies.length === 0) {
      validationErrors.push("Please enter at least one hobby");
    } else if (hobbies.length > 255) {
      validationErrors.push("Please use less than 255 characters for hobbies");
    }

    if (imgUrl1.length === 0) {
      validationErrors.push("Please add in an image 1");
    } else if (!imgUrl1.endsWith(".jpg")) {
      if (!imgUrl1.endsWith(".png")) {
        validationErrors.push("Image 1 does not end with jpg or png.");
      }
    }

    if (imgUrl2 !== null) {
      if (!imgUrl2.endsWith(".jpg")) {
        if (!imgUrl2.endsWith(".png")) {
          validationErrors.push("Image 2 does not end with jpg or png.");
        }
      }
    }

    if (imgUrl3 !== null) {
      if (!imgUrl3.endsWith(".jpg")) {
        if (!imgUrl3.endsWith(".png")) {
          validationErrors.push("Image 3 does not end with jpg or png.");
        }
      }
    }

    return validationErrors;
  };

  const onSubmit = async (e) => {
    const validationErrors = validate();

    if (validationErrors.length > 0) {
      e.preventDefault();
      return setValidationErrors(validationErrors);
    }

    let count = submitted + 1;
    setSubmitted(count);
    e.preventDefault();
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
                    pathname: "/profile/create/about",
                    state: { newProfile: newProfile },
                  }}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </NavLink>
              </div>
              <div className="create-name-icon">
                <i class="fa-solid fa-circle-user"></i>
              </div>
              <div className="create-name-details">Final details</div>
            </div>
          </div>
        </div>
        <div>
          <form>
            <div>
              {validationErrors &&
                validationErrors.map((error) => <div>{error}</div>)}
            </div>
            <div className="create-final-details-content-container">
              <div>
                <div className="final-details-input-container">
                  <div>
                    <label>Languages</label>
                  </div>
                  <div>
                    <input
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="final-details-input-container">
                  <div>
                    <label>Pets</label>
                  </div>
                  <div>
                    <input
                      value={pets}
                      onChange={(e) => setPets(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="final-details-input-container">
                  <div>
                    <label>Hobbies</label>
                  </div>
                  <div>
                    <input
                      value={hobbies}
                      onChange={(e) => setHobbies(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="final-details-input-container">
                  <div>
                    <label>Identify As</label>
                  </div>
                  <div>
                    <input
                      value={identifyAs}
                      onChange={(e) => setIdentifyAs(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="final-details-input-container">
                  <div>
                    <label>Looking For As</label>
                  </div>
                  <div>
                    <input
                      value={lookingFor}
                      onChange={(e) => setLookingFor(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="final-details-input-container">
                  <div>
                    <label>Kids</label>
                  </div>
                  <div>
                    <select
                      value={kids}
                      onChange={(e) => setKids(e.target.value)}
                    >
                      <option value="Have kids and I love them">
                        Have kids and I love them
                      </option>
                      <option value="Don't have kids">Don't have kids</option>
                      <option value="Don't have kids but want them">
                        Don't have kids but want them
                      </option>
                    </select>
                  </div>
                </div>
                <div className="final-details-input-container">
                  <div>
                    <label>Image URL</label>
                  </div>
                  <div>
                    <input
                      value={imgUrl1}
                      onChange={(e) => setImgUrl1(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="final-details-input-container">
                  <div>
                    <label>Image URL (optional)</label>
                  </div>
                  <div>
                    <input
                      value={imgUrl2}
                      onChange={(e) => setImgUrl2(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="final-details-input-container">
                  <div>
                    <label>Image URL (optional)</label>
                  </div>
                  <div>
                    <input
                      value={imgUrl3}
                      onChange={(e) => setImgUrl3(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="create-profile-button-container">
          {/* <NavLink
            to={{
              pathname: "/profiles",
              state: { newProfile: newProfile },
            }}
          > */}
          <button
            className="create-profile-button"
            onClick={(e) => onSubmit(e)}
          >
            Next
          </button>
          {/* </NavLink> */}
        </div>
      </div>
    </>
  );
}

export default CreateProfileOther;
