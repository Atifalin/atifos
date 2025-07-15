import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// App icons for the dock
const appIcons = [
  { id: 'finder', name: 'Finder', icon: '📁', component: 'Finder' },
  { id: 'terminal', name: 'Terminal', icon: '💻', component: 'Terminal' },
  { id: 'resume', name: 'Resume', icon: '📄', component: 'ResumeViewer' },
  { id: 'photos', name: 'Photos', icon: '🖼️', component: 'Photos' },
  { id: 'settings', name: 'Settings', icon: '⚙️', component: 'Settings' },
  { id: 'minime', name: 'MiniMe', icon: '🤖', component: 'MiniMe' },
];

const Dock = ({ onAppClick, openApps = [], onRestoreMinimized = () => {} }) => {
  const [hoveredApp, setHoveredApp] = useState(null);
  const [dockScale, setDockScale] = useState(1);

  // Handle app click - either open or restore
  const handleAppClick = (app) => {
    const openApp = openApps.find(open => open.id === app.id);
    if (openApp && openApp.isMinimized) {
      // Restore minimized app
      onRestoreMinimized(app.id);
    } else {
      // Regular app click (open new or focus existing)
      onAppClick({
        id: app.id,
        title: app.name,
        component: app.component,
        icon: app.icon
      });
    }
  };

  useEffect(() => {
    // Find apps that are open but not visible in the openApps array (minimized)
    const minimized = appIcons.filter(app => {
      const openApp = openApps.find(open => open.id === app.id);
      return openApp && openApp.isMinimized;
    });
    // setMinimizedApps(minimized); // This line was commented out, assuming you want to keep it
  }, [openApps]);

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        className="bg-white bg-opacity-15 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-white border-opacity-20"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onHoverStart={() => setDockScale(1.05)}
        onHoverEnd={() => setDockScale(1)}
      >
        <div className="flex space-x-2">
          {appIcons.map((app) => {
            const openApp = openApps.find(open => open.id === app.id);
            const isOpen = Boolean(openApp);
            const isMinimized = openApp?.isMinimized;
            const isActive = isOpen && !isMinimized;

            return (
              <motion.div
                key={app.id}
                className={`relative p-2 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-white bg-opacity-20' : isMinimized ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-10'}`}
                whileHover={{
                  scale: 1.2,
                  y: -5
                }}
                animate={{
                  scale: isMinimized ? 0.95 : 1
                }}
                onClick={() => handleAppClick(app)}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <div className="text-2xl">{app.icon}</div>

                {/* App name tooltip */}
                <AnimatePresence>
                  {hoveredApp === app.id && (
                    <motion.div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-white bg-opacity-15 backdrop-blur-md text-white text-xs rounded-lg shadow-lg whitespace-nowrap border border-white border-opacity-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                    >
                      {app.name}
                      {isMinimized && " (Minimized)"}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Indicator dot for open apps */}
                {isOpen && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className={`w-1.5 h-1.5 ${isMinimized ? 'bg-gray-400' : 'bg-blue-400'} rounded-full`}></div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dock;
