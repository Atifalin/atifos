import { createContext, useContext, useState, useEffect } from 'react';

// Available profiles with extended data
export const PROFILES = {
  EMPLOYER: 'Employer',
  FRIENDS: 'Friends',
  FAMILY: 'Family'
};

// Profile data with details for each profile
export const PROFILE_DATA = {
  [PROFILES.EMPLOYER]: {
    name: 'Employer',
    emoji: '👔',
    description: 'Professional view focused on skills and experience',
    greeting: 'Welcome to my professional portfolio',
    theme: {
      primary: 'blue',
      accent: 'indigo',
      background: 'gradient-to-br from-blue-900 via-indigo-900 to-purple-900'
    },
    visibleApps: ['Finder', 'Terminal', 'ResumeViewer', 'Projects', 'Skills', 'AboutThisOS'],
    miniMeStyle: 'professional'
  },
  [PROFILES.FRIENDS]: {
    name: 'Friends',
    emoji: '😎',
    description: 'Casual view with personal projects and interests',
    greeting: 'Hey there! Welcome to my digital space',
    theme: {
      primary: 'purple',
      accent: 'pink',
      background: 'gradient-to-br from-purple-800 via-pink-700 to-red-600'
    },
    visibleApps: ['Finder', 'Terminal', 'Projects', 'Photos', 'Interests', 'AboutThisOS'],
    miniMeStyle: 'casual'
  },
  [PROFILES.FAMILY]: {
    name: 'Family',
    emoji: '👨‍👩‍👦',
    description: 'Personal view with family photos and stories',
    greeting: 'Welcome to our family space!',
    theme: {
      primary: 'green',
      accent: 'teal',
      background: 'gradient-to-br from-green-800 via-teal-700 to-blue-600'
    },
    visibleApps: ['Photos', 'Family', 'Timeline', 'AboutThisOS', 'Terminal'],
    miniMeStyle: 'relaxed'
  }
};

// Create the context
export const ProfileContext = createContext();

// Custom hook for using the profile context
export const useProfile = () => useContext(ProfileContext);

// Provider component
export const ProfileProvider = ({ children, initialProfile = PROFILES.EMPLOYER }) => {
  const [currentProfile, setCurrentProfile] = useState(initialProfile);
  const [profileData, setProfileData] = useState(PROFILE_DATA[initialProfile]);
  
  // Update profile data when current profile changes
  useEffect(() => {
    setProfileData(PROFILE_DATA[currentProfile]);
  }, [currentProfile]);

  // Function to change the current profile
  const changeProfile = (profile) => {
    if (Object.values(PROFILES).includes(profile)) {
      setCurrentProfile(profile);
    } else {
      console.error(`Invalid profile: ${profile}`);
    }
  };

  return (
    <ProfileContext.Provider 
      value={{ 
        currentProfile, 
        profileData, 
        changeProfile, 
        PROFILES 
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
