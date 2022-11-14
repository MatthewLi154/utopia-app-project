import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchAllProfiles } from "../../../store/profile";
import "./CreateProfileOther.css";

function CreateProfileOther() {
  const dispatch = useDispatch();
  const uselocation = useLocation();

  const newProfile = uselocation.state?.newProfile;

  const [languages, setLanguages] = useState("");
  const [pets, setPets] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [kids, setKids] = useState("");

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, []);

  useEffect(() => {
    newProfile.languages = languages;
    newProfile.pets = pets;
    newProfile.hobbies = hobbies;
    newProfile.kids = kids;
  }, [languages, pets, hobbies, kids]);

  const onSubmit = async (e) => {};

  return (
    <>
      <h1>Other</h1>
      <form>
        <div>
          <div>
            <label>Languages</label>
          </div>
          <div>
            <input
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
            ></input>
          </div>
          <div>
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
          <div>
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
          <div>
            <div>
              <label>kids</label>
            </div>
            <div>
              <select value={kids} onChange={(e) => setKids(e.target.value)}>
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
        </div>
      </form>
      <NavLink
        to={{
          pathname: "/profile/create/about",
          state: { newProfile: newProfile },
        }}
      >
        <button onClick={(e) => onSubmit(e)}>Next</button>
      </NavLink>
    </>
  );
}

export default CreateProfileOther;
