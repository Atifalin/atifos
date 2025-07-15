import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TopBar from './TopBar';
import Dock from './Dock';
import AppWindow from './AppWindow';
import { useDevice } from '../../contexts/DeviceContext';

const DesktopUI = () => {
  const { isDesktop, isTablet } = useDevice();
  const [openApps, setOpenApps] = useState([]);
  const [activeAppId, setActiveAppId] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState({
    backgroundImage: 'linear-gradient(to right bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)'
  });

  // Only show desktop UI on desktop or tablet devices
  if (!isDesktop && !isTablet) {
    return null;
  }

  // Function to open an app
  const openApp = (app) => {
    // Check if app is already open
    const existingApp = openApps.find(a => a.id === app.id);
    
    if (existingApp) {
      // Bring to front
      setActiveAppId(app.id);
    } else {
      // Add to open apps
      setOpenApps([...openApps, app]);
      setActiveAppId(app.id);
    }
  };

  // Function to close an app
  const closeApp = (appId) => {
    setOpenApps(openApps.filter(app => app.id !== appId));
    
    // Set active app to the last opened app if available
    if (activeAppId === appId && openApps.length > 1) {
      const remainingApps = openApps.filter(app => app.id !== appId);
      setActiveAppId(remainingApps[remainingApps.length - 1].id);
    } else if (openApps.length === 1) {
      setActiveAppId(null);
    }
  };

  // Function to bring an app to the front
  const bringToFront = (appId) => {
    setActiveAppId(appId);
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative"
      style={backgroundStyle}
    >
      {/* Top Bar */}
      <TopBar />
      
      {/* App Windows */}
      <div className="absolute inset-0 pt-6 pb-16">
        {openApps.map((app) => (
          <AppWindow
            key={app.id}
            app={app}
            isActive={activeAppId === app.id}
            onClose={() => closeApp(app.id)}
            onFocus={() => bringToFront(app.id)}
          />
        ))}
      </div>
      
      {/* Dock */}
      <Dock onAppClick={openApp} />
    </div>
  );
};

export default DesktopUI;
