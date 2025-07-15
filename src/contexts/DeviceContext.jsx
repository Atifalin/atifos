import { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Device types
export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop'
};

// Create the context
export const DeviceContext = createContext();

// Custom hook for using the device context
export const useDevice = () => useContext(DeviceContext);

// Provider component
export const DeviceProvider = ({ children }) => {
  // Device state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [orientation, setOrientation] = useState('landscape');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Derived values
  const deviceType = useMemo(() => {
    if (isMobile) return DEVICE_TYPES.MOBILE;
    if (isTablet) return DEVICE_TYPES.TABLET;
    return DEVICE_TYPES.DESKTOP;
  }, [isMobile, isTablet]);

  // Function to update device state based on window size
  const updateDeviceState = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Update dimensions
    setDimensions({ width, height });
    
    // Update device type
    setIsMobile(width < 768);
    setIsTablet(width >= 768 && width < 1024);
    setIsDesktop(width >= 1024);
    
    // Update orientation
    setOrientation(width > height ? 'landscape' : 'portrait');
  };
  
  // Utility functions for components
  const getDeviceSpecificValue = (mobileValue, tabletValue, desktopValue) => {
    if (isMobile) return mobileValue;
    if (isTablet) return tabletValue;
    return desktopValue;
  };
  
  // Check if device supports touch
  const [hasTouch, setHasTouch] = useState(false);
  
  useEffect(() => {
    // Detect touch capability
    setHasTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Set initial device state
    updateDeviceState();

    // Add event listeners
    window.addEventListener('resize', updateDeviceState);
    window.addEventListener('orientationchange', updateDeviceState);

    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', updateDeviceState);
      window.removeEventListener('orientationchange', updateDeviceState);
    };
  }, []);

  return (
    <DeviceContext.Provider 
      value={{
        // Basic device type flags
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        
        // Additional device information
        orientation,
        dimensions,
        hasTouch,
        
        // Utility functions
        getDeviceSpecificValue,
        updateDeviceState
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
