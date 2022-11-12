import React, { useState, useEffect } from "react";
import { useSelector, useHistory, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function CreateProfileBirthday() {
  const dispatch = useDispatch();
  const uselocation = useLocation();
  const newProfile = uselocation.state?.newProfile;

  console.log(newProfile);

  const [birthday, setBirthday] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  useEffect(() => {
    newProfile.birthday = birthday;
    console.log(newProfile);
  }, [birthday]);

  const onSubmit = async (e) => {};

  return (
    <div>
      <h1>When is your birthday?</h1>
      <label>Birthday</label>
      <form>
        <input
          placeholder="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </form>
      <NavLink
        to={{
          pathname: "/profile/create/location",
          state: { newProfile: newProfile },
        }}
      >
        <button onClick={(e) => onSubmit(e)}>Next</button>
      </NavLink>
    </div>
  );
}

export default CreateProfileBirthday;
