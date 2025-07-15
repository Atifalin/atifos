import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import Dock from './Dock';
import AppWindow from './AppWindow';
import { useDevice } from '../../contexts/DeviceContext';

const DesktopUI = () => {
  const { isDesktop, isTablet } = useDevice();
  const [openApps, setOpenApps] = useState([]);
  const [activeAppId, setActiveAppId] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState({
    backgroundImage: 'linear-gradient(135deg, #2a5298, #1e3c72, #2a5298)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  });

  // Only show desktop UI on desktop or tablet devices
  if (!isDesktop && !isTablet) {
    return null;
  }

  // Handle opening an app
  const handleOpenApp = (app) => {
    // Check if app is already open
    const existingAppIndex = openApps.findIndex(openApp => openApp.id === app.id);
    
    if (existingAppIndex >= 0) {
      // If already open, just set it as active and ensure it's not minimized
      const updatedApps = [...openApps];
      updatedApps[existingAppIndex] = {
        ...updatedApps[existingAppIndex],
        isMinimized: false
      };
      setOpenApps(updatedApps);
      setActiveAppId(app.id);
    } else {
      // Otherwise, add it to open apps
      setOpenApps([...openApps, { ...app, isMinimized: false }]);
      setActiveAppId(app.id);
    }
  };

  // Handle closing an app
  const handleCloseApp = (appId) => {
    setOpenApps(openApps.filter(app => app.id !== appId));
    
    // If the closed app was active, set the last app as active, or null if none left
    if (activeAppId === appId) {
      const remainingApps = openApps.filter(app => app.id !== appId);
      const nonMinimizedApps = remainingApps.filter(app => !app.isMinimized);
      setActiveAppId(nonMinimizedApps.length > 0 ? nonMinimizedApps[nonMinimizedApps.length - 1].id : null);
    }
  };

  // Handle focusing an app
  const handleFocusApp = (appId) => {
    setActiveAppId(appId);
  };
  
  // Handle minimizing an app
  const handleMinimizeApp = (appId) => {
    const updatedApps = openApps.map(app => {
      if (app.id === appId) {
        return { ...app, isMinimized: true };
      }
      return app;
    });
    setOpenApps(updatedApps);
    
    // Set the next non-minimized app as active, or null if none left
    const nonMinimizedApps = updatedApps.filter(app => !app.isMinimized);
    setActiveAppId(nonMinimizedApps.length > 0 ? nonMinimizedApps[nonMinimizedApps.length - 1].id : null);
  };
  
  // Handle restoring a minimized app
  const handleRestoreMinimized = (appId) => {
    const updatedApps = openApps.map(app => {
      if (app.id === appId) {
        return { ...app, isMinimized: false };
      }
      return app;
    });
    setOpenApps(updatedApps);
    setActiveAppId(appId);
  };

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen overflow-hidden !flex-none !items-stretch !justify-start bg-transparent"
      style={backgroundStyle}
    >
      {/* Desktop background */}
      <div className="absolute inset-0 z-0">
        {/* Background image or gradient with subtle animation */}
        <motion.div 
          className="absolute inset-0 bg-blue-900 bg-opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
      
      {/* Top bar */}
      <TopBar openApps={openApps} activeAppId={activeAppId} />
      
      {/* App windows */}
      <div className="relative z-10 h-full pt-8">
        <AnimatePresence>
          {openApps.map((app) => (
            !app.isMinimized && (
              <AppWindow
                key={app.id}
                app={app}
                isActive={activeAppId === app.id}
                onClose={() => handleCloseApp(app.id)}
                onFocus={() => handleFocusApp(app.id)}
                onMinimize={() => handleMinimizeApp(app.id)}
              />
            )
          ))}
        </AnimatePresence>
      </div>
      
      {/* Dock */}
      <Dock 
        onAppClick={handleOpenApp} 
        openApps={openApps} 
        onRestoreMinimized={handleRestoreMinimized} 
      />
    </div>
  );
};

export default DesktopUI;
