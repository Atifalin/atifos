import { motion } from 'framer-motion';
import Terminal from '../shared/Terminal';
import Finder from '../apps/Finder';
import ResumeViewer from '../apps/ResumeViewer';
import Calculator from '../apps/Calculator';
import Calendar from '../apps/Calendar';
import Clock from '../apps/Clock';
// Import other app components as needed

// Map of app components
const appComponents = {
  Terminal: Terminal,
  Finder: Finder,
  ResumeViewer: ResumeViewer,
  Calculator: Calculator,
  Calendar: Calendar,
  Clock: Clock,
  // Ensure all app IDs from AppGrid are properly mapped here
  Photos: () => <div className="p-4 text-white bg-white bg-opacity-10 backdrop-blur-md h-full rounded-lg border border-white border-opacity-20">Gallery app coming soon</div>,
  AboutThisOS: () => <div className="p-4 text-white bg-white bg-opacity-10 backdrop-blur-md h-full rounded-lg border border-white border-opacity-20">About This OS app coming soon</div>,
  Settings: () => <div className="p-4 text-white bg-white bg-opacity-10 backdrop-blur-md h-full rounded-lg border border-white border-opacity-20">Settings app coming soon</div>,
  Trash: () => <div className="p-4 text-white bg-white bg-opacity-10 backdrop-blur-md h-full rounded-lg border border-white border-opacity-20">Archive app coming soon</div>
};

const MobileAppPanel = ({ app, onClose }) => {
  // Get the component for this app
  const AppComponent = appComponents[app.component] || (() => (
    <div className="p-4 text-white bg-white bg-opacity-10 backdrop-blur-md h-full flex flex-col items-center justify-center rounded-lg border border-white border-opacity-20">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-bold mb-2">App Not Found</h2>
      <p className="text-center text-gray-300 mb-4">
        The app "{app.title}" ({app.component}) could not be found or is still in development.
      </p>
      <button 
        onClick={onClose}
        className="px-4 py-2 bg-blue-500 bg-opacity-70 rounded-lg text-white hover:bg-opacity-90 transition-colors"
      >
        Return to Home
      </button>
    </div>
  ));

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(135deg, #2a5298, #1e3c72, #2a5298)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      {/* App header */}
      <div className="h-14 flex items-center justify-between px-4 bg-white bg-opacity-15 backdrop-blur-md border-b border-white border-opacity-20 shadow-sm">
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
      <div className="flex-1 overflow-hidden p-2">
        <AppComponent />
      </div>
    </motion.div>
  );
};

export default MobileAppPanel;
