import { motion } from 'framer-motion';
import Terminal from '../shared/Terminal';
// Import other app components as needed

// Map of app components
const appComponents = {
  Terminal: Terminal,
  // Add other components as they are created
};

const MobileAppPanel = ({ app, onClose }) => {
  // Get the component for this app
  const AppComponent = appComponents[app.component] || (() => <div>App not found</div>);

  return (
    <motion.div 
      className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      {/* App header */}
      <div className="glass-effect h-14 flex items-center justify-between px-4">
        <button 
          className="text-white flex items-center"
          onClick={onClose}
        >
          <span className="mr-2">←</span>
          <span>Back</span>
        </button>
        
        <div className="text-white font-medium flex items-center">
          <span className="mr-2">{app.icon}</span>
          <span>{app.title}</span>
        </div>
        
        <div className="w-12"></div> {/* Spacer for balance */}
      </div>
      
      {/* App content */}
      <div className="flex-1 overflow-hidden">
        <AppComponent />
      </div>
    </motion.div>
  );
};

export default MobileAppPanel;
