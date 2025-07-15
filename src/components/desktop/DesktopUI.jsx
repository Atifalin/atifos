import { useState, useEffect, useMemo } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import Dock from './Dock';
import AppWindow from './AppWindow';
import { useDevice } from '../../contexts/DeviceContext';

const DesktopUI = () => {
  const { currentProfile } = useProfile();
  // --- Add a class to body to fix centering only when DesktopUI is active ---
  useEffect(() => {
    document.body.classList.add('desktop-root-active');
    document.documentElement.classList.add('desktop-root-active');
    return () => {
      document.body.classList.remove('desktop-root-active');
      document.documentElement.classList.remove('desktop-root-active');
    };
  }, []);


  const { isDesktop, isTablet } = useDevice();
  const [openApps, setOpenApps] = useState([]);
  const [activeAppId, setActiveAppId] = useState(null);

  // Only show desktop UI on desktop or tablet devices
  if (!isDesktop && !isTablet) return null;

  // App open/close/focus/minimize/restore logic
  const handleOpenApp = (app) => {
    const existingAppIndex = openApps.findIndex(openApp => openApp.id === app.id);
    if (existingAppIndex >= 0) {
      const updatedApps = [...openApps];
      updatedApps[existingAppIndex] = { ...updatedApps[existingAppIndex], isMinimized: false };
      setOpenApps(updatedApps);
      setActiveAppId(app.id);
    } else {
      setOpenApps([...openApps, { ...app, isMinimized: false }]);
      setActiveAppId(app.id);
    }
  };
  const handleCloseApp = (appId) => {
    setOpenApps(openApps.filter(app => app.id !== appId));
    if (activeAppId === appId) {
      const remainingApps = openApps.filter(app => app.id !== appId);
      const nonMinimizedApps = remainingApps.filter(app => !app.isMinimized);
      setActiveAppId(nonMinimizedApps.length > 0 ? nonMinimizedApps[nonMinimizedApps.length - 1].id : null);
    }
  };
  const handleFocusApp = (appId) => setActiveAppId(appId);
  const handleMinimizeApp = (appId) => {
    const updatedApps = openApps.map(app => app.id === appId ? { ...app, isMinimized: true } : app);
    setOpenApps(updatedApps);
    const nonMinimizedApps = updatedApps.filter(app => !app.isMinimized);
    setActiveAppId(nonMinimizedApps.length > 0 ? nonMinimizedApps[nonMinimizedApps.length - 1].id : null);
  };
  const handleRestoreMinimized = (appId) => {
    const updatedApps = openApps.map(app => app.id === appId ? { ...app, isMinimized: false } : app);
    setOpenApps(updatedApps);
    setActiveAppId(appId);
  };

  // Gradient classes per profile (tailwind colors must be present at build)
  const gradientMap = useMemo(() => ({
    Employer: 'bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-600',
    Friends:  'bg-gradient-to-br from-pink-600 via-red-500 to-yellow-500',
    Family:   'bg-gradient-to-br from-green-400 via-teal-400 to-blue-400',
  }), []);
  const gradientClass = gradientMap[currentProfile] || gradientMap.Employer;

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none">
      {/* Animated profile-specific wallpaper */}
      <motion.div
        key={currentProfile}
        className={`absolute inset-0 z-0 ${gradientMap[currentProfile] || gradientMap.Employer}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      />
      {/* Glassy blur overlay for desktop effect */}
      <div className="absolute inset-0 z-0 backdrop-blur-2xl bg-white/15" style={{WebkitBackdropFilter:'blur(32px)'}} />

      {/* Top Bar */}
      <div className="relative z-50">
        <TopBar openApps={openApps} activeAppId={activeAppId} onQuickAppClick={handleOpenApp} />
      </div>

      {/* App Windows */}
      <div className="absolute inset-0 z-30">
        <AnimatePresence>
          {openApps.map(app => (
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

      {/* Centered Dock at bottom */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center z-40 pointer-events-none">
        <div className="relative pointer-events-auto">
          <Dock
            onAppClick={handleOpenApp}
            openApps={openApps}
            onRestoreMinimized={handleRestoreMinimized}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopUI;
