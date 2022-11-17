import { createContext, useContext, useState } from "react";

export const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export default function ProfileProvider({ children }) {
  const [profileData, setProfileData] = useState({});

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
