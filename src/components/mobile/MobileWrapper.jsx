import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDevice } from '../../contexts/DeviceContext';
import AppGrid from './AppGrid';
import BottomNav from './BottomNav';
import MobileAppPanel from './MobileAppPanel';

const MobileWrapper = () => {
  const { isMobile } = useDevice();
  const [activeApp, setActiveApp] = useState(null);
  
  // Only show mobile UI on mobile devices
  if (!isMobile) {
    return null;
  }

  // Function to open an app
  const openApp = (app) => {
    setActiveApp(app);
  };

  // Function to close an app
  const closeApp = () => {
    setActiveApp(null);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700">
      {activeApp ? (
        // App panel when an app is open
        <MobileAppPanel 
          app={activeApp} 
          onClose={closeApp} 
        />
      ) : (
        // Home screen with app grid
        <>
          <div className="pt-12 pb-20 px-4 h-full">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
              AtifOS Mobile
            </h1>
            
            <AppGrid onAppClick={openApp} />
          </div>
          
          <BottomNav />
        </>
      )}
    </div>
  );
};

export default MobileWrapper;
