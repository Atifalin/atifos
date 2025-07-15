import { useState } from 'react';
import { motion } from 'framer-motion';

// Define app icons for the dock
const appIcons = [
  { id: 'finder', name: 'Finder', icon: '📁', component: 'Finder' },
  { id: 'terminal', name: 'Terminal', icon: '💻', component: 'Terminal' },
  { id: 'resume', name: 'Resume', icon: '📄', component: 'ResumeViewer' },
  { id: 'photos', name: 'Photos', icon: '🖼️', component: 'Photos' },
  { id: 'about', name: 'About', icon: 'ℹ️', component: 'AboutThisOS' },
  { id: 'settings', name: 'Settings', icon: '⚙️', component: 'Settings' },
  { id: 'trash', name: 'Trash', icon: '🗑️', component: 'Trash' },
];

const Dock = ({ onAppClick }) => {
  const [hoveredApp, setHoveredApp] = useState(null);

  // Handle app click
  const handleAppClick = (app) => {
    onAppClick({
      id: app.id,
      title: app.name,
      component: app.component,
      icon: app.icon
    });
  };

  return (
    <motion.div 
      className="glass-effect fixed bottom-2 left-1/2 transform -translate-x-1/2 h-14 px-2 rounded-xl flex items-center justify-center z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex space-x-1 items-end">
        {appIcons.map((app) => (
          <motion.div
            key={app.id}
            className="flex flex-col items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.2, y: -10 }}
            onHoverStart={() => setHoveredApp(app.id)}
            onHoverEnd={() => setHoveredApp(null)}
            onClick={() => handleAppClick(app)}
          >
            {/* App icon */}
            <div className="w-10 h-10 flex items-center justify-center text-2xl bg-white bg-opacity-20 rounded-lg">
              {app.icon}
            </div>
            
            {/* App name tooltip */}
            {hoveredApp === app.id && (
              <motion.div 
                className="absolute bottom-16 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {app.name}
              </motion.div>
            )}
            
            {/* Dot indicator for open apps (to be implemented) */}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dock;
