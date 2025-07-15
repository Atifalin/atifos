import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Terminal from '../shared/Terminal';
// Import other app components as needed

// Map of app components
const appComponents = {
  Terminal: Terminal,
  // Add other components as they are created
};

const AppWindow = ({ app, isActive, onClose, onFocus }) => {
  const [position, setPosition] = useState({ x: 100, y: 50 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const windowRef = useRef(null);
  
  // Get the component for this app
  const AppComponent = appComponents[app.component] || (() => <div>App not found</div>);

  // Handle window click to bring to front
  const handleWindowClick = (e) => {
    if (!isActive) {
      onFocus();
    }
  };

  // Handle window drag
  const handleDragStart = (e) => {
    if (e.target.classList.contains('window-header')) {
      setIsDragging(true);
      onFocus();
    }
  };

  const handleDrag = (e, info) => {
    if (isDragging) {
      setPosition({
        x: position.x + info.delta.x,
        y: position.y + info.delta.y
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Handle window resize
  const handleResizeStart = (direction) => (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    onFocus();
  };

  const handleResize = (e, info) => {
    if (isResizing) {
      const { width, height } = size;
      const { x, y } = info.delta;
      
      switch (resizeDirection) {
        case 'right':
          setSize({ width: width + x, height });
          break;
        case 'bottom':
          setSize({ width, height: height + y });
          break;
        case 'bottom-right':
          setSize({ width: width + x, height: height + y });
          break;
        default:
          break;
      }
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeDirection(null);
  };

  return (
    <motion.div
      ref={windowRef}
      className={`absolute rounded-lg overflow-hidden shadow-lg ${isActive ? 'z-30' : 'z-20'}`}
      style={{ 
        width: size.width, 
        height: size.height,
        x: position.x, 
        y: position.y,
        border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
      }}
      animate={{ scale: isActive ? 1 : 0.98 }}
      onClick={handleWindowClick}
      drag={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      dragMomentum={false}
      dragElastic={0}
    >
      {/* Window header */}
      <div 
        className="window-header glass-effect h-8 flex items-center justify-between px-2 cursor-move"
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center space-x-1">
          {/* Close button */}
          <div 
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            onClick={onClose}
          ></div>
          {/* Minimize button */}
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          {/* Maximize button */}
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        <div className="text-sm font-medium text-white">
          {app.icon} {app.title}
        </div>
        
        <div className="w-16"></div> {/* Spacer for balance */}
      </div>
      
      {/* Window content */}
      <div className="bg-gray-900 bg-opacity-80 h-[calc(100%-2rem)] overflow-hidden">
        <AppComponent />
      </div>
      
      {/* Resize handles */}
      <div 
        className="absolute bottom-0 right-0 w-4 h-full cursor-ew-resize"
        onMouseDown={handleResizeStart('right')}
      ></div>
      <div 
        className="absolute bottom-0 right-0 h-4 w-full cursor-ns-resize"
        onMouseDown={handleResizeStart('bottom')}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize"
        onMouseDown={handleResizeStart('bottom-right')}
      ></div>
    </motion.div>
  );
};

export default AppWindow;
