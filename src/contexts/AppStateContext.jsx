import { createContext, useContext, useState } from 'react';

// Create context
const AppStateContext = createContext();

// Custom hook for using the context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

// Provider component
export const AppStateProvider = ({ children }) => {
  const [openApps, setOpenApps] = useState([]);
  const [activeAppId, setActiveAppId] = useState(null);

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

  // Value to be provided by the context
  const value = {
    openApps,
    activeAppId,
    handleOpenApp,
    handleCloseApp,
    handleFocusApp,
    handleMinimizeApp,
    handleRestoreMinimized
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
