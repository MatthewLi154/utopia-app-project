import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { createProfile, fetchAllProfiles } from "../../../store/profile";

function CreateProfileBio() {
  const dispatch = useDispatch();
  const uselocation = useLocation();

  const newProfile = uselocation.state?.newProfile;
  const currentUserId = useSelector((state) => state?.session.user.id);

  const [bio, setBio] = useState("");
  const [identifyAs, setIdentifyAs] = useState("Dog");
  const [lookingFor, setLookingFor] = useState("Dog");
  const [imgUrl, setImgUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  useEffect(() => {
    dispatch(fetchAllProfiles());
  }, []);

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

    // use newProfile data and send the post request to create new profile
    // new profile needs
    // user_id, first_name, last_name, birthday, location, bio, identify_as, looking_for
    // img_url, score (later)
    let firstName, lastName;
    [firstName, lastName] = newProfile.name.split(" ");

    const data = {
      user_id: currentUserId,
      first_name: firstName,
      last_name: lastName,
      birthday: newProfile.birthday,
      bio: newProfile.bio,
      location: newProfile.location,
      identify_as: newProfile.identifyAs,
      looking_for: newProfile.lookingFor,
      img_url: newProfile.imgUrl,
    };

    // dispatch(addProfile(data));
    dispatch(createProfile(data));

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
