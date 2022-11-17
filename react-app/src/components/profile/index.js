import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import { NavLink } from "react-router-dom";
import "./Profiles.css";
import {
  getProfileMatches,
  getProfileMatchPercentage,
} from "../../store/match";


function Profile() {
  const userProfiles = useSelector((state) => state.profiles.user_profiles);
  const currentUserId = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProfiles());
    dispatch(getProfileMatchPercentage());
    dispatch(getProfileMatches());
  }, []);

  let userProfilesArray = [];
  for (const profile in userProfiles) {
    userProfilesArray.push(userProfiles[profile]);
  }

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

  return (
    <>
      <div className="entire-profiles-page">
        <div className="main-profiles-page-container">
          <ul className="inner-profiles-container">
            {userProfiles &&
              userProfilesArray.map(
                (profile) =>
                  profile.user_id !== currentUserId && (
                    <li className="profile-box" key={profile.id}>
                      <div className="profile-box-content" id="main">
                        <NavLink to={`/profile/${profile.id}`}>
                        <img className="profile-img" src={profile.img_url1}></img>
                        </NavLink>
                        </div>

                        <NavLink
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
                        >


                          <h3 className="card-title" id="texting">{profile.first_name}</h3>
                        </NavLink>
                        <div className="profile-box-sub-content">
                          <div id="texting">
                            {profile.location} •{" "}
                            {calculateAge(profile.birthday)}
                          </div>
                        </div>

                    </li>
                  )
              )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile;
