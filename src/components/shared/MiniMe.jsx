import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../contexts/ProfileContext';
import { useAppState } from '../../contexts/AppStateContext';

const MiniMe = ({ isVisible = true }) => {
  const { currentProfile } = useProfile();
  const { openApps, activeAppId } = useAppState();
  const [message, setMessage] = useState('');
  const [animation, setAnimation] = useState('idle');
  const [showOptions, setShowOptions] = useState(false);
  const [currentActivity, setCurrentActivity] = useState('exploring'); // Default activity
  
  // Use the new minime.png image for all profiles
  const miniMeImage = '/assets/minime.png';

  // Welcome messages based on profile
  const welcomeMessages = {
    Employer: "Welcome to AtifOS! I'm here to help you explore my professional experience.",
    Friends: "Hey there! Welcome to my digital space. Feel free to look around!",
    Family: "Hi family! Thanks for checking out my digital resume. Love you all!",
  };

  // Activity-based dialog options
  const dialogOptions = {
    exploring: [
      { text: "What can I do here?", action: () => showGuideMessage("You can explore my professional profile through the various apps in the dock below.") },
      { text: "Show me around", action: () => showGuideMessage("Click on the dock icons at the bottom to open different apps. Try the Finder to see my resume or Terminal for commands!") },
      { text: "Tell me about yourself", action: () => showGuideMessage("I'm Atif's digital assistant. I can help you navigate AtifOS and learn more about his professional experience and skills.") }
    ],
    terminal: [
      { text: "Available commands?", action: () => showGuideMessage("Try these commands: 'help', 'about', 'show projects', 'export resume', or 'clear'") },
      { text: "How to use AI chat?", action: () => showGuideMessage("Just type any question about Atif's experience, skills, or background directly in the terminal.") },
      { text: "Exit terminal", action: () => showGuideMessage("Click the X in the top-left corner or click outside the terminal window to minimize it.") }
    ],
    finder: [
      { text: "Navigate sections?", action: () => showGuideMessage("Click on the different sections in the sidebar to explore my experience, education, and skills.") },
      { text: "View details?", action: () => showGuideMessage("Click on any experience card to expand and see more details about my role and achievements.") },
      { text: "Search resume?", action: () => showGuideMessage("Use the search bar at the top to quickly find specific skills or experiences in my resume.") }
    ],
    clock: [
      { text: "What's this app?", action: () => showGuideMessage("The Clock app shows the current time in different time zones where I've worked or collaborated with teams.") },
      { text: "Change view?", action: () => showGuideMessage("You can switch between analog and digital clock views using the buttons at the bottom.") },
      { text: "Why time zones?", action: () => showGuideMessage("The different time zones represent my global work experience and ability to collaborate across international teams.") }
    ]
  };

  // Detect user activity based on open apps or context
  useEffect(() => {
    // Get the active app (non-minimized and currently focused)
    const activeApp = openApps.find(app => app.id === activeAppId && !app.isMinimized);
    
    // Set current activity based on active app
    if (activeApp) {
      if (activeApp.id === 'terminal') {
        setCurrentActivity('terminal');
      } else if (activeApp.id === 'finder') {
        setCurrentActivity('finder');
      } else if (activeApp.id === 'clock') {
        setCurrentActivity('clock');
      } else {
        setCurrentActivity('exploring');
      }
    } else {
      setCurrentActivity('exploring');
    }
  }, [openApps, activeAppId]);

  useEffect(() => {
    // Show welcome message when profile changes
    setMessage(welcomeMessages[currentProfile] || welcomeMessages.Employer);
    setShowOptions(false); // Hide options when profile changes
    
    // Clear message after 5 seconds
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentProfile]);

  // Function to show a guide message
  const showGuideMessage = useCallback((text, duration = 5000) => {
    setMessage(text);
    setAnimation('talking');
    setShowOptions(false);
    
    const timer = setTimeout(() => {
      setMessage('');
      setAnimation('idle');
    }, duration);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to toggle dialog options
  const toggleOptions = useCallback(() => {
    setShowOptions(prev => !prev);
    if (!showOptions) {
      setMessage("How can I help you?");
    } else {
      setMessage('');
    }
  }, [showOptions]);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50 flex items-end"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      {/* Message bubble with options */}
      <AnimatePresence>
        {(message || showOptions) && (
          <motion.div 
            className="glass-effect mb-2 mr-2 p-3 max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {message && <p className="text-sm mb-2">{message}</p>}
            
            {/* Dialog options */}
            {showOptions && (
              <div className="flex flex-col gap-2 mt-2">
                {dialogOptions[currentActivity]?.map((option, index) => (
                  <button 
                    key={index}
                    className="text-xs text-left px-2 py-1 rounded hover:bg-white/10 transition-colors"
                    onClick={option.action}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Avatar */}
      <motion.div 
        className="w-16 h-16 rounded-full overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleOptions}
      >
        <img 
          src={miniMeImage} 
          alt="Mini-Me Assistant" 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default MiniMe;
