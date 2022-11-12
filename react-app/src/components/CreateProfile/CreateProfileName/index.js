import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

function CreateProfileName() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  let newProfile = {};
  useEffect(() => {
    newProfile.name = name;
  }, [name]);

  const onSubmit = async (e) => {
    // check for validations
    // if no errors
    // add it to
    // redirect to new profile page
  };

  return (
    <div>
      <h1>What is your name</h1>
      <label>Name</label>
      <form>
        <input
          placeholder="First name, Last name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <NavLink
        to={{
          pathname: "/profile/create/birthday",
          state: { newProfile: newProfile },
        }}
      >
        <button onClick={(e) => onSubmit(e)}>Next</button>
      </NavLink>
    </div>
  );
}

export default CreateProfileName;
