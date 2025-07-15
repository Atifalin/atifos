import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// App icons for the dock
const appIcons = [
  { id: 'finder', name: 'Finder', icon: '📁', component: 'Finder' },
  { id: 'terminal', name: 'Terminal', icon: '💻', component: 'Terminal' },
  { id: 'resume', name: 'Resume', icon: '📄', component: 'ResumeViewer' },
  { id: 'calculator', name: 'Calculator', icon: '🧮', component: 'Calculator' },
  { id: 'calendar', name: 'Calendar', icon: '📅', component: 'Calendar' },
  { id: 'clock', name: 'Clock', icon: '⏰', component: 'Clock' },
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
      className="fixed left-1/2 -translate-x-1/2 bottom-8 z-30"
      style={{ pointerEvents: 'auto', width: 'auto', display: 'block' }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Glassy blurred dock bar with strong shadow, border, and highlight */}
      <div className="relative flex items-end px-6 py-4 min-h-[90px] bg-white/25 backdrop-blur-2xl border border-white/30 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]" style={{boxShadow: '0 12px 32px 0 rgba(31,38,135,0.22), 0 1.5px 4px 0 rgba(255,255,255,0.08)'}}>
        {/* Top reflective highlight */}
        <div className="absolute left-4 right-4 top-0 h-4 rounded-t-full bg-white/40 opacity-40 blur-sm pointer-events-none" />
        <div className="flex flex-row items-end justify-center space-x-5">
          {appIcons.map((app) => {
            const openApp = openApps.find(open => open.id === app.id);
            const isOpen = Boolean(openApp);
            const isMinimized = openApp?.isMinimized;
            const isActive = isOpen && !isMinimized;

            return (
              <motion.div
                key={app.id}
                className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-white bg-opacity-30' : isMinimized ? 'bg-white bg-opacity-15' : 'hover:bg-white hover:bg-opacity-15'}`}
                whileHover={{
                  scale: 1.32,
                  y: -18
                }}
                animate={{
                  scale: isMinimized ? 0.95 : 1
                }}
                onClick={() => handleAppClick(app)}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                style={{ minWidth: 54 }}
              >
                <div className="text-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)] select-none">
                  {app.icon}
                </div>
                {/* App name tooltip */}
                <AnimatePresence>
                  {hoveredApp === app.id && (
                    <motion.div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1 bg-white/30 backdrop-blur text-gray-900 text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap border border-white/40"
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
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className={`w-2 h-2 ${isMinimized ? 'bg-gray-300' : 'bg-blue-500'} rounded-full shadow-lg`}></div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Dock;
