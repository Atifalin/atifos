import { createContext, useContext, useState } from 'react';

// Available profiles
export const PROFILES = {
  EMPLOYER: 'Employer',
  FRIENDS: 'Friends',
  FAMILY: 'Family'
};

// Create the context
export const ProfileContext = createContext();

// Custom hook for using the profile context
export const useProfile = () => useContext(ProfileContext);

// Provider component
export const ProfileProvider = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState(PROFILES.EMPLOYER);

  // Function to change the current profile
  const changeProfile = (profile) => {
    if (Object.values(PROFILES).includes(profile)) {
      setCurrentProfile(profile);
    } else {
      console.error(`Invalid profile: ${profile}`);
    }
  };

  return (
    <ProfileContext.Provider value={{ currentProfile, changeProfile, PROFILES }}>
      {children}
    </ProfileContext.Provider>
  );
};
