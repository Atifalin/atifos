import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import Dock from './Dock';
import AppWindow from './AppWindow';
import DotGridBackground from './DotGridBackground';
import { useDevice } from '../../contexts/DeviceContext';
import { useAppState } from '../../contexts/AppStateContext';

const DesktopUI = () => {
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
  const { 
    openApps, 
    activeAppId, 
    handleOpenApp, 
    handleCloseApp, 
    handleFocusApp, 
    handleMinimizeApp, 
    handleRestoreMinimized 
  } = useAppState();

  // Only show desktop UI on desktop or tablet devices
  if (!isDesktop && !isTablet) return null;

  // App logic is now handled by AppStateContext

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none">
      {/* Dot grid interactive background */}
      <DotGridBackground />

      {/* Top Bar */}
      <div className="relative z-20">
        <TopBar 
          openApps={openApps} 
          activeAppId={activeAppId} 
          onQuickAppClick={handleOpenApp} 
        />
      </div>

      {/* App Windows */}
      <div className="absolute inset-0 z-30 pointer-events-none">
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
