import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function CreateProfileBio() {
  const dispatch = useDispatch();
  const uselocation = useLocation();
  const newProfile = uselocation.state?.newProfile;

  const [bio, setBio] = useState("");
  const [identifyAs, setIdentifyAs] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  useEffect(() => {
    newProfile.bio = bio;
    newProfile.identifyAs = identifyAs;
    newProfile.lookingFor = lookingFor;
    newProfile.imgUrl = imgUrl;
    console.log(newProfile);
  }, [bio, identifyAs, lookingFor, imgUrl]);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(newProfile);

    // check for validations

    // if no errors

    // use thunk to fetch request to add data to profile db
    // use thunk to update profile state with new profile and set single profile to new profile

    // redirect to new profile page
  };

  return (
    <div>
      <h1>About me</h1>
      <form>
        <div>
          <textarea
            placeholder="Biography"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Identify As</label>
          <select
            value={identifyAs}
            onChange={(e) => setIdentifyAs(e.target.value)}
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Looking For</label>
          <select
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Image URL</label>
          <input
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Image must end in jpg or png"
          ></input>
        </div>
      </form>
      <NavLink
        to={{
          pathname: "/profile",
        }}
      >
        <button onClick={(e) => onSubmit(e)}>Create Profile</button>
      </NavLink>
    </div>
  );
}

export default CreateProfileBio;
