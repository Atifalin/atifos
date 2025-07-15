import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../contexts/ProfileContext';

const TopBar = ({ openApps = [], activeAppId = null, onQuickAppClick = () => {} }) => {
  const { currentProfile } = useProfile();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time as HH:MM AM/PM
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  // Format date as Day, Month Date
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  
  // Get active app name
  const getActiveAppName = () => {
    if (!activeAppId) return 'Finder';
    const activeApp = openApps.find(app => app.id === activeAppId);
    return activeApp ? activeApp.title : 'Finder';
  };
  
  // Toggle dropdown menu
  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };
  
  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-8 bg-white bg-opacity-10 backdrop-blur-md flex items-center justify-between px-4 z-50 shadow-sm border-b border-white border-opacity-10"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Left side - App menu */}
      <div className="flex items-center space-x-4">
        <div className="font-bold flex items-center">
          <span className="mr-1">🏠</span> 
          <span>AtifOS</span>
        </div>
        
        {/* Menu items */}
        <div className="flex space-x-4">
          {['File', 'Edit', 'View', 'Window', 'Help'].map(menu => (
            <div 
              key={menu} 
              className={`text-sm relative px-2 py-1 rounded-md cursor-pointer ${activeDropdown === menu ? 'bg-gray-700 bg-opacity-50' : 'hover:bg-gray-700 hover:bg-opacity-30'}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(menu);
              }}
            >
              {menu}
              
              {/* Dropdown menu */}
              <AnimatePresence>
                {activeDropdown === menu && (
                  <motion.div 
                    className="absolute top-full left-0 mt-1 w-48 bg-white bg-opacity-15 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden z-50 border border-white border-opacity-20"
                    initial={{ opacity: 0, y: -5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.98 }}
                    transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="py-1">
                      {['Option 1', 'Option 2', 'Option 3'].map(option => (
                        <div 
                          key={option} 
                          className="px-4 py-2 text-sm hover:bg-white hover:bg-opacity-20 cursor-pointer transition-colors duration-150 ease-in-out flex items-center gap-2"
                        >
                          <span className="opacity-90">{option}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      {/* Center - Active app name */}
      <div className="absolute left-1/2 transform -translate-x-1/2 font-medium">
        {getActiveAppName()}
      </div>
      
      {/* Right side - Quick Apps & Status */}
      <div className="flex items-center space-x-4 text-sm">
        {/* Quick-launch: none. Calendar/Clock are now on date/time click below. */}
        {/* Status icons */}
        <div
          className="px-2 py-1 rounded-md hover:bg-blue-400/20 cursor-pointer transition-colors"
          title="Open Calendar"
          onClick={() => onQuickAppClick({ id: 'calendar', title: 'Calendar', component: 'Calendar', icon: '📅' })}
        >
          {formattedDate}
        </div>
        <div
          className="px-2 py-1 rounded-md hover:bg-blue-400/20 cursor-pointer transition-colors"
          title="Open Clock"
          onClick={() => onQuickAppClick({ id: 'clock', title: 'Clock', component: 'Clock', icon: '⏰' })}
        >
          {formattedTime}
        </div>
        <div className="cursor-pointer hover:text-gray-300">🔊</div>
        <div className="cursor-pointer hover:text-gray-300">📶</div>
        <div className="cursor-pointer hover:text-gray-300">🔋</div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span>Online</span>
        </div>
        <div>{currentProfile}</div>
      </div>
    </motion.div>
  );
};

export default TopBar;
