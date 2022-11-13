import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import "./SingleUserProfile.css";

function SingleUserProfile() {
  const { profileId } = useParams();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state?.profiles.singleProfile);

  useEffect(() => {
    dispatch(fetchSingleProfile(profileId));
    dispatch(fetchAllProfiles());
  }, []);

  return (
    <>
      <div className="single-profile-main-container">
        <div className="single-profile-container">
          <div className="upper-name-location-age-images-container">
            <div className="name-age-location-match">
              <div className="name-age-location">
                <div className="name-container">
                  <h3>{profile.first_name}</h3>
                </div>
                <div className="age-location-container">
                  <span>
                    {profile.birthday} • {profile.location}
                  </span>
                </div>
              </div>
              <div className="match-percent-container">
                <h4>{profile.id}%</h4>
              </div>
            </div>
            <div className="profile-images-container">
              <div className="profile-image">
                <img src="https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg"></img>
              </div>
              <div className="profile-image">
                <img src="https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg"></img>
              </div>
              <div className="profile-image">
                <img src="https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg"></img>
              </div>
            </div>
          </div>
          <div className="bottom-details-container">
            <div className="bottom-left-column-container">
              <div className="left-column-biography-container">
                <div className="biography-container-label">
                  <h4>About Me</h4>
                </div>
                <div className="biography-container-bio">{profile.bio}</div>
              </div>
            </div>
            <div className="bottom-right-column-container">
              <div className="details-label-container">
                <h4>Details</h4>
              </div>
              <div className="identify-as-container">
                <div className="identify-as-icon"></div>
                <div className="identify-as-detials">{profile.identify_as}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleUserProfile;
