import { motion } from 'framer-motion';

// Define app icons for the grid based on QRD.md
const appIcons = [
  { id: 'finder', name: 'Resume', icon: '📁', component: 'Finder' },
  { id: 'terminal', name: 'Chat', icon: '💬', component: 'Terminal' },
  { id: 'resume', name: 'PDF', icon: '📄', component: 'ResumeViewer' },
  { id: 'calculator', name: 'Calculator', icon: '🧮', component: 'Calculator' },
  { id: 'calendar', name: 'Calendar', icon: '📅', component: 'Calendar' },
  { id: 'clock', name: 'Clock', icon: '⏰', component: 'Clock' },
  { id: 'photos', name: 'Gallery', icon: '🖼️', component: 'Photos' },
  { id: 'about', name: 'About', icon: 'ℹ️', component: 'AboutThisOS' },
  { id: 'settings', name: 'Settings', icon: '⚙️', component: 'Settings' },
  { id: 'trash', name: 'Archive', icon: '🗑️', component: 'Trash' },
];

const AppGrid = ({ onAppClick }) => {
  // Handle app click
  const handleAppClick = (app) => {
    onAppClick({
      id: app.id,
      title: app.name,
      component: app.component,
      icon: app.icon
    });
  };

  // Animation variants for grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="grid grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {appIcons.map((app) => (
        <motion.div
          key={app.id}
          className="flex flex-col items-center"
          variants={itemVariants}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAppClick(app)}
        >
          <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-1 bg-white bg-opacity-15 backdrop-blur-md border border-white border-opacity-20 shadow-lg">
            {app.icon}
          </div>
          <span className="text-xs text-white font-medium">{app.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AppGrid;
