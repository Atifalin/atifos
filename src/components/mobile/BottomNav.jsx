import { motion } from 'framer-motion';
import { useProfile } from '../../contexts/ProfileContext';

const BottomNav = () => {
  const { currentProfile, changeProfile, PROFILES } = useProfile();

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around px-4 bg-white bg-opacity-15 backdrop-blur-md border-t border-white border-opacity-20 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Home button */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
          <span className="text-xl">🏠</span>
        </div>
        <span className="text-xs text-white mt-1">Home</span>
      </div>
      
      {/* Profile switcher */}
      <div className="flex flex-col items-center">
        <div 
          className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
          onClick={() => {
            // Cycle through profiles
            const profiles = Object.values(PROFILES);
            const currentIndex = profiles.indexOf(currentProfile);
            const nextIndex = (currentIndex + 1) % profiles.length;
            changeProfile(profiles[nextIndex]);
          }}
        >
          <span className="text-xl">
            {currentProfile === PROFILES.EMPLOYER ? '👔' : 
             currentProfile === PROFILES.FRIENDS ? '😎' : '👨‍👩‍👦'}
          </span>
        </div>
        <span className="text-xs text-white mt-1">Profile</span>
      </div>
      
      {/* Info button */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
          <span className="text-xl">ℹ️</span>
        </div>
        <span className="text-xs text-white mt-1">Info</span>
      </div>
    </motion.div>
  );
};

export default BottomNav;
