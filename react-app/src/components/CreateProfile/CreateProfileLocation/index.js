import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import "./CreateProfileLocation.css";

function CreateProfileLocation() {
  const dispatch = useDispatch();
  const uselocation = useLocation();
  const newProfile = uselocation.state?.newProfile;

  const [location, setLocation] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  useEffect(() => {
    newProfile.location = location;
    console.log(newProfile);
  }, [location]);

  const onSubmit = async (e) => {};

  return (
    <div>
      <h1>Where do you live?</h1>
      <label>Location</label>
      <form>
        <input
          placeholder="City, State"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </form>
      <NavLink
        to={{
          pathname: "/profile/create/other",
          state: { newProfile: newProfile },
        }}
      >
        <button onClick={(e) => onSubmit(e)}>Next</button>
      </NavLink>
    </div>
  );
}

export default CreateProfileLocation;
