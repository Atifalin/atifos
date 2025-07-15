import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
export const DeviceContext = createContext();

// Custom hook for using the device context
export const useDevice = () => useContext(DeviceContext);

// Provider component
export const DeviceProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Function to update device state based on window size
    const updateDeviceState = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    // Set initial state
    updateDeviceState();

    // Add event listener for window resize
    window.addEventListener('resize', updateDeviceState);

    // Clean up event listener
    return () => window.removeEventListener('resize', updateDeviceState);
  }, []);

  return (
    <DeviceContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </DeviceContext.Provider>
  );
};
