import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { getProfileMatches } from "../../store/match";
import { fetchAllProfiles } from "../../store/profile";
import "./BrowseBar.css";

function BrowseBar() {
  const history = useHistory();

  const [matches, setMatches] = useState(false);

  const allProfiles = useSelector((state) =>
    Object.values(state?.profiles.user_profiles)
  );
  const currentUserId = useSelector((state) => state?.session.user.id);
  console.log(currentUserId);

  let profileExist = false;
  for (const profile of allProfiles) {
    if (profile.user_id === currentUserId) {
      profileExist = true;
    }
  }

  // Check if profile exists then conditionally render components

  return (
    <>
      <div className="browse-bar-main-container">
        <div
          className="bubble-container"
          onClick={(e) => {
            history.push("/profiles");
          }}
        >
          <div>
            <img src="https://i.pinimg.com/originals/9c/46/8f/9c468f7406570bd8093032289253188c.jpg"></img>
          </div>
          <div>
            <label>All</label>
          </div>
        </div>
        {profileExist && (
          <div
            className="bubble-container"
            onClick={(e) => {
              setMatches(true);
              history.push("/profiles/matches");
            }}
          >
            <div>
              <img src="https://c4.wallpaperflare.com/wallpaper/145/523/587/cute-anime-girl-wallpaper-preview.jpg"></img>
            </div>
            <div>
              <label>Matches</label>
            </div>
          </div>
        )}

        <div
          className="bubble-container"
          onClick={(e) => history.push("/profiles/humans")}
        >
          <div>
            <img src="https://images.medicinenet.com/images/article/main_image/transgender-person.jpg"></img>
          </div>
          <div>
            <label>Humans</label>
          </div>
        </div>
        <div
          className="bubble-container"
          onClick={(e) => history.push("/profiles/vampires")}
        >
          <div>
            <img src="https://www.listchallenges.com/f/lists/c7d04cbe-c796-4764-9f70-db3e9f8c38b6.jpg"></img>
          </div>
          <div>
            <label>Vampires</label>
          </div>
        </div>
        <div
          className="bubble-container"
          onClick={(e) => history.push("/profiles/fairies")}
        >
          <div>
            <img src="https://cdn.myanimelist.net/s/common/uploaded_files/1478835353-305d486a1d2c7527b8f778ef176c21e6.png"></img>
          </div>
          <div>
            <label>Fairies</label>
          </div>
        </div>
        <div
          className="bubble-container"
          onClick={(e) => history.push("/profiles/other")}
        >
          <div>
            <img src="https://washingtondl.org/wp-content/uploads/2018/05/anime-night-560x380.jpg"></img>
          </div>
          <div>
            <label>Other</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default BrowseBar;
