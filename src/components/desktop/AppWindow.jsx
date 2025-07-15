import { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import Terminal from '../shared/Terminal';
import Finder from '../apps/Finder';
import ResumeViewer from '../apps/ResumeViewer';
import Calculator from '../apps/Calculator';
import Calendar from '../apps/Calendar';
import Clock from '../apps/Clock';

// Map of app components
const appComponents = {
  Terminal: Terminal,
  Finder: Finder,
  ResumeViewer: ResumeViewer,
  Calculator: Calculator,
  Calendar: Calendar,
  Clock: Clock,
};

const AppWindow = ({ app, isActive, onClose, onFocus, onMinimize }) => {
  const [position, setPosition] = useState({ x: Math.random() * 100 + 50, y: Math.random() * 50 + 50 });
  const [size, setSize] = useState({ width: Math.min(700, window.innerWidth - 40), height: Math.min(500, window.innerHeight - 100) });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef(null);
  const dragControls = useDragControls();
  const previousSize = useRef({ width: Math.min(700, window.innerWidth - 40), height: Math.min(500, window.innerHeight - 100) });
  const previousPosition = useRef({ x: 100, y: 50 });

  // Get the component for this app
  const AppComponent = appComponents[app.component] || (() => <div>App not found</div>);

  // Handle window click to bring to front
  const handleWindowClick = (e) => {
    if (!isActive) {
      onFocus();
    }
  };

  // Start drag when mousedown on the header
  const startDrag = (event) => {
    if (!isMaximized) {
      dragControls.start(event, { snapToCursor: false });
      onFocus();
    }
  };

  // Handle minimize button click
  const handleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(true);
    if (onMinimize) {
      onMinimize(app.id);
    }
  };

  // Handle maximize button click
  const handleMaximize = (e) => {
    e.stopPropagation();
    
    if (isMaximized) {
      // Restore previous size and position
      setSize(previousSize.current);
      setPosition(previousPosition.current);
      setIsMaximized(false);
    } else {
      // Save current size and position
      previousSize.current = size;
      previousPosition.current = position;
      
      // Maximize window
      setSize({ width: window.innerWidth - 20, height: window.innerHeight - 80 });
      setPosition({ x: 10, y: 40 });
      setIsMaximized(true);
    }
  };

  // Handle close button click
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };


  // Handle window restore from minimized state
  const handleRestore = () => {
    setIsMinimized(false);
  };
  
  // Effect to handle window resize when browser window changes
  useEffect(() => {
    if (isMaximized) {
      const handleWindowResize = () => {
        setSize({ width: window.innerWidth - 20, height: window.innerHeight - 80 });
      };
      
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    }
  }, [isMaximized]);

  // Determine if window should be rendered (not if minimized)
  if (isMinimized) {
    return null; // Will be handled by the dock
  }

  return (
    <motion.div
      ref={windowRef}
      className={`window absolute rounded-xl overflow-hidden shadow-xl flex flex-col ${isActive ? 'z-20' : 'z-10'} pointer-events-auto`}
      style={{ 
        width: `${size.width}px`, 
        height: `${size.height}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        border: isActive ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isActive ? '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: position.x, 
        y: position.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={handleWindowClick}
      drag={!isMaximized}
      dragListener={false} // Disable automatic drag detection
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{ left: 0, right: window.innerWidth - size.width, top: 0, bottom: window.innerHeight - size.height }}
      onDragEnd={(e, info) => {
        setPosition(prev => ({
          x: prev.x + info.offset.x,
          y: prev.y + info.offset.y
        }));
      }}
    >
      {/* Window header */}
      <div 
        className="window-header h-8 flex items-center justify-between px-3 cursor-move bg-white bg-opacity-5 backdrop-blur-sm border-b border-white border-opacity-10"
        onPointerDown={startDrag}
        onMouseDown={startDrag}
        style={{ touchAction: 'none' }}
      >
        <div className="flex items-center space-x-2">
          {/* Close button */}
          <div 
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer flex items-center justify-center group"
            onClick={handleClose}
          >
            <span className="text-red-900 opacity-0 group-hover:opacity-100 text-xs font-bold">×</span>
          </div>
          {/* Minimize button */}
          <div 
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer flex items-center justify-center group"
            onClick={handleMinimize}
          >
            <span className="text-yellow-900 opacity-0 group-hover:opacity-100 text-xs font-bold">_</span>
          </div>
          {/* Maximize button */}
          <div 
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer flex items-center justify-center group"
            onClick={handleMaximize}
          >
            <span className="text-green-900 opacity-0 group-hover:opacity-100 text-xs font-bold">+</span>
          </div>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium text-white flex items-center">
          <span className="mr-1">{app.icon}</span> {app.title}
        </div>
      </div>
      
      {/* Window content */}
      <div className="bg-gray-900 bg-opacity-90 h-[calc(100%-2rem)] overflow-hidden">
        <div className="h-full w-full overflow-hidden">
          <AppComponent />
        </div>
      </div>
     
    </motion.div>
  );
};

export default AppWindow;
