import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import {
  getProfileMatches,
  getProfileMatchPercentage,
} from "../../store/match";
import {
  fetchAllProfiles,
  fetchSingleProfile,
  deleteSingleProfile,
  deleteProfile,
} from "../../store/profile";
import { deleteUser } from "../../store/session";
import "./SingleUserProfile.css";
import "./newSingleUserProfile.css"

function SingleUserProfile() {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const profile = useSelector((state) => state.profiles.singleProfile);
  const matchPercent = useSelector((state) => state.matches.matchedPercent);
  const currentUserId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(fetchSingleProfile(profileId));
    dispatch(fetchAllProfiles());
    dispatch(getProfileMatchPercentage());
    dispatch(getProfileMatches());
  }, [dispatch]);

  let percent = 0;
  for (const match in matchPercent) {
    if (matchPercent[match].matched_profile_id === parseInt(profileId)) {
      percent = Math.floor(matchPercent[match].matching_percentage * 100);
    }
  }

  const birthday = profile.birthday;
  const calculateAge = (birthday) => {
    const [month, day, year] = birthday.split("-");
    const birthdate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let years = today.getFullYear() - year;

    if (
      today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() == birthdate.getMonth() &&
        today.getDate() < birthdate.getDate())
    ) {
      years--;
    }
    return years;
  };

  let age;
  if (birthday) {
    age = calculateAge(birthday);
  }

  let editProfileData;
  // if (profile) {
  editProfileData = {
    bio: profile.bio,
    current_goals: profile.current_goals,
    hobbies: profile.hobbies,
    kids: profile.kids,
    languages: profile.languages,
    location: profile.location,
    looking_for: profile.looking_for,
    pets: profile.pets,
    identify_as: profile.identify_as,
    age: age,
    img_url1: profile.img_url1,
    first_name: profile.first_name,
  };
  // }

  const onDeleteProfile = async (e) => {
    e.preventDefault();
    const response = window.confirm("Are you sure you want to do that?");
    if (response) {
      await dispatch(deleteUser(currentUserId));
      await dispatch(deleteProfile(currentUserId));
      await dispatch(fetchAllProfiles());

      await fetch("/api/auth/logout");
      // await dispatch(getProfileMatchPercentage());
      // await dispatch(getProfileMatches());
      history.push("/");
    }
    // return;
  };

  return (
    <>
      <div className="single-profile-main-container">
        <div className="Left-side-profile-container">
          <div className="match-with-others-button-container">BLAH
            {profile.id === currentUserId && profile.score < 5 && (
              <div>
                <button
                  onClick={() => {
                    history.push(
                      `/profile/${profile.id}/personality-questions`
                    );
                  }}
                >
                  Match with Others
                </button>
              </div>
            )}
          </div>
          <div className="left-profile">
          <div className="profile-images-container">
            <div className="big-image-left">
            <div className="profile-image-big">
              <img src={profile.img_url1}></img>
            </div>
            </div>
            <div className="small-image-right">
            <div className="profile-image-small">
              <img src={profile.img_url2}></img>
            </div>
            <div className="profile-image-small">
              <img src={profile.img_url3}></img>
            </div>
            </div>
            </div>
            <div className="name-age-location-match">
              <div className="name-age-location">
                <div className="name-container">
                  <h3>{profile.first_name}</h3>
                  {percent !== 0 && (
                <div className="match-percent-container">
                  <h4>{percent}%</h4>
                </div>
              )}
                </div>
                <div className="age-location-container">
                  <span>
                  {age} • {profile.location}
                  </span>
                </div>
              </div>


            </div>

          </div>
        </div>

        <div className="Right-side-profile-container">
        <div className="bottom-details-container">
            <div className="bottom-left-column-container">
              <div className="left-column-biography-container">
                <div className="biography-container-label">
                  <h4>About Me</h4>
                </div>
                <div className="biography-container-bio">{profile.bio}</div>
              </div>
              <div className="left-column-biography-container">
                <div className="biography-container-label">
                  <h4>Current goals</h4>
                </div>
                <div className="biography-container-bio">
                  {profile.current_goals}
                </div>
              </div>
            </div>
            <div className="bottom-right-column-container">
              <div className="details-label-container">
                <div>
                  <h4>Details</h4>
                </div>
                {currentUserId === profile.user_id && (
                  <>
                    <div>
                      <div>
                        <NavLink
                          to={{
                            pathname: `/profile/${profileId}/edit`,
                            state: { editProfileData: editProfileData },
                          }}
                        >
                          <h4>Edit</h4>
                        </NavLink>
                      </div>
                    </div>
                    <div>
                      <h4
                        onClick={(e) => {
                          onDeleteProfile(e);
                        }}
                      >
                        Delete
                      </h4>
                    </div>
                  </>
                )}
              </div>
              <div className="identify-as-container">
                <div className="identify-as-icon">
                  <i className="fa-sharp fa-solid fa-dna"></i>
                </div>
                <div className="identify-as-detials">{profile.identify_as}</div>
              </div>
              <div className="languages-container">
                <div className="languages-icon">
                  <i class="fa-solid fa-hands-asl-interpreting"></i>
                </div>
                <div className="languages-details">{profile.languages}</div>
              </div>
              <div className="hobbies-container">
                <div className="hobbies-icon">
                  <i className="fa-regular fa-face-smile"></i>
                </div>
                <div className="hobbies-details">{profile.hobbies}</div>
              </div>
              <div className="kids-container">
                <div className="kids-icon">
                  <i className="fa-solid fa-child"></i>
                </div>
                <div className="kids-details">{profile.kids}</div>
              </div>
              <div className="pets-container">
                <div className="pets-icon">
                  <i className="fa-solid fa-cat"></i>
                </div>
                <div className="pets-details">Has {profile.pets}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleUserProfile;
