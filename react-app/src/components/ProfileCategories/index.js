import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import { NavLink, useParams } from "react-router-dom";
import { getProfileMatches } from "../../store/match";
import PersonalityQuestions from "../PersonalityQuestions";
import "./ProfileCategories.css";

function ProfileCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const userProfiles = useSelector((state) =>
    Object.values(state.profiles.user_profiles)
  );
  const currentUserId = useSelector((state) => state.session.user.id);
  const matchedProfiles = useSelector((state) =>
    Object.values(state.matches.matchedProfiles)
  );

  useEffect(() => {
    dispatch(fetchAllProfiles());
    dispatch(getProfileMatches());
  }, []);

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

  // Filter users for each criteria
  let categoryProfileData = {
    exists: false,
    profiles: null,
  };
  if (category === "matches") {
    // use matched profiles to get user profiles
    categoryProfileData.exists = true;
    categoryProfileData.profiles = matchedProfiles;
  } else if (category === "vampires") {
    categoryProfileData.exists = true;
    categoryProfileData.category = "vampires";
    let filteredVampireProfiles = [];
    for (const profile of userProfiles) {
      if (profile.identify_as.toLowerCase().includes("vamp")) {
        filteredVampireProfiles.push(profile);
      }
    }
    categoryProfileData.profiles = filteredVampireProfiles;
  } else if (category === "humans") {
    categoryProfileData.exists = true;
    categoryProfileData.category = "humans";
    // filter profile identify as for humans
    let filteredHumanProfiles = [];
    for (const profile of userProfiles) {
      if (profile.identify_as.toLowerCase().includes("human")) {
        filteredHumanProfiles.push(profile);
      }
    }
    categoryProfileData.profiles = filteredHumanProfiles;
  } else if (category === "fairies") {
    categoryProfileData.exists = true;
    categoryProfileData.category = "fairies";
    // filter profile identify as for fairies
    let filteredFairyProfiles = [];
    for (const profile of userProfiles) {
      if (profile.identify_as.toLowerCase().includes("fair")) {
        filteredFairyProfiles.push(profile);
      }
    }
    categoryProfileData.profiles = filteredFairyProfiles;
  } else if (category === "other") {
    categoryProfileData.exists = true;
    categoryProfileData.category = "other";
    let filteredOtherProfiles = [];
    let otherCheck = ["match", "human", "fair", "vamp"];
    for (const profile of userProfiles) {
      if (
        !otherCheck.some((check) =>
          profile.identify_as.toLowerCase().includes(check)
        )
      ) {
        filteredOtherProfiles.push(profile);
      }
    }
    categoryProfileData.profiles = filteredOtherProfiles;
  }

  return (
    <>
      {categoryProfileData.profiles.length > 0 && (
        <div className="entire-profiles-page">
          <div className="main-profiles-page-container">
            <ul className="inner-profiles-container">
              {/* <div>{categoryProfileData.category}</div> */}
              {categoryProfileData.profiles &&
                categoryProfileData.profiles.map(
                  (profile) =>
                    profile.user_id !== currentUserId && (
                      <li className="profile-box" key={profile.id}>
                        <div className="profile-box-content" id="main">
                          <NavLink to={`/profile/${profile.id}`}>
                            <img
                              className="profile-img"
                              src={profile.img_url1}
                            ></img>
                          </NavLink>
                        </div>

                        <div className="profile-box-sub-content">
                          {/* <NavLink
                          // onClick={async (e) => {
                          //   await dispatch(fetchSingleProfile(profile.id));
                          // }}

                          to={{
                            pathname: `/profile/${profile.id}`,
                          }}
                          style={{
                            textDecoration: "none",
                            color: "rgb(00, 82, 94)",
                          }}
                        > */}

                          <h3 className="card-title" id="texting">
                            {profile.first_name}
                          </h3>
                          {/* </NavLink> */}
                          <div id="texting">
                            <ul>
                              <li>Location:{profile.location}</li>
                              <li>Age: {calculateAge(profile.birthday)}</li>
                              <li>Looking for: {profile.looking_for}</li>
                              <li>Biography: {profile.bio}</li>
                              <li>Current Goals: {profile.current_goals}</li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      // <div className="profile-box" key={profile.id}>
                      //   <div className="profile-box-content">
                      //     <img src={profile.img_url1}></img>
                      //     <NavLink
                      //       to={{
                      //         pathname: `/profile/${profile.id}`,
                      //       }}
                      //       style={{
                      //         textDecoration: "none",
                      //         color: "rgb(00, 82, 94)",
                      //       }}
                      //     >
                      //       <h3>{profile.first_name}</h3>
                      //     </NavLink>
                      //     <div className="profile-box-sub-content">
                      //       <div>
                      //         {profile.location} •{" "}
                      //         {calculateAge(profile.birthday)}
                      //       </div>
                      //     </div>
                      //   </div>
                      // </div>
                    )
                )}
            </ul>
          </div>
        </div>
      )}
      {categoryProfileData.profiles.length === 0 && (
        <div className="not-matched-profiles">
          <h1>You have not matched with anyone!</h1>
          <h2>Please complete the questionnaire to start your journey!</h2>
          <NavLink to={`/profile/${currentUserId}/personality-questions`}>
            <div className="button-question">
              <button className="question-button">Questionnaire</button>
            </div>
          </NavLink>
        </div>
      )}
    </>
  );
}

export default ProfileCategory;
