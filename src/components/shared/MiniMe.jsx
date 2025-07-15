import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../contexts/ProfileContext';

const MiniMe = ({ isVisible = true }) => {
  const { currentProfile } = useProfile();
  const [message, setMessage] = useState('');
  const [animation, setAnimation] = useState('idle');
  
  // Different avatars based on profile
  const avatars = {
    Employer: '/assets/gifs/mini-me-professional.gif',
    Friends: '/assets/gifs/mini-me-casual.gif',
    Family: '/assets/gifs/mini-me-relaxed.gif',
  };

  // Welcome messages based on profile
  const welcomeMessages = {
    Employer: "Welcome to AtifOS! I'm here to help you explore my professional experience.",
    Friends: "Hey there! Welcome to my digital space. Feel free to look around!",
    Family: "Hi family! Thanks for checking out my digital resume. Love you all!",
  };

  useEffect(() => {
    // Show welcome message when profile changes
    setMessage(welcomeMessages[currentProfile] || welcomeMessages.Employer);
    
    // Clear message after 5 seconds
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentProfile]);

  // Function to show a message
  const showMessage = (text, duration = 5000) => {
    setMessage(text);
    setAnimation('talking');
    
    const timer = setTimeout(() => {
      setMessage('');
      setAnimation('idle');
    }, duration);
    
    return () => clearTimeout(timer);
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50 flex items-end"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      {/* Message bubble */}
      <AnimatePresence>
        {message && (
          <motion.div 
            className="glass-effect mb-2 mr-2 p-3 max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p className="text-sm">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Avatar */}
      <motion.div 
        className="w-16 h-16 rounded-full overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => showMessage("Need help? Try opening the Terminal app and typing 'help'!")}
      >
        <img 
          src={avatars[currentProfile] || avatars.Employer} 
          alt="Mini-Me Assistant" 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default MiniMe;
