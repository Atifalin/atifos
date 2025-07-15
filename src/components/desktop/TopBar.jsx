import { useState, useEffect } from 'react';
import { useProfile } from '../../contexts/ProfileContext';

const TopBar = () => {
  const { currentProfile } = useProfile();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time as HH:MM AM/PM
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="glass-effect h-6 w-full fixed top-0 left-0 z-40 flex items-center justify-between px-4 text-sm text-white shadow-md">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <div className="font-bold">AtifOS</div>
        <div>File</div>
        <div>Edit</div>
        <div>View</div>
      </div>
      
      {/* Right section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span>Online</span>
        </div>
        <div>{currentProfile}</div>
        <div>{formattedTime}</div>
      </div>
    </div>
  );
};

export default TopBar;
