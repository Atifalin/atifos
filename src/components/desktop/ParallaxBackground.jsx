import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useProfile, PROFILES } from '../../contexts/ProfileContext';

// Layer configuration for each scene
const SCENE_LAYERS = {
  [PROFILES.EMPLOYER]: {
    name: 'mountain',
    layers: [
      { id: 'sky', depth: 0.01, height: '100%' },
      { id: 'far-mountains', depth: 0.03, height: '45%' },
      { id: 'mid-mountains', depth: 0.06, height: '40%' },
      { id: 'lake', depth: 0.1, height: '30%' },
      { id: 'front-mountains', depth: 0.15, height: '35%' },
      { id: 'foreground', depth: 0.2, height: '20%' },
    ],
    baseColor: '#7EB6FF'
  },
  [PROFILES.FRIENDS]: {
    name: 'forest',
    layers: [
      { id: 'sky', depth: 0.01, height: '100%' },
      { id: 'far-trees', depth: 0.03, height: '45%' },
      { id: 'mid-trees', depth: 0.08, height: '40%' },
      { id: 'front-trees', depth: 0.15, height: '35%' },
      { id: 'foreground', depth: 0.2, height: '25%' },
    ],
    baseColor: '#88D1F1'
  },
  [PROFILES.FAMILY]: {
    name: 'waterfall',
    layers: [
      { id: 'sky', depth: 0.01, height: '100%' },
      { id: 'far-cliffs', depth: 0.02, height: '50%' },
      { id: 'mid-cliffs', depth: 0.06, height: '45%' },
      { id: 'waterfall', depth: 0.1, height: '40%' },
      { id: 'front-cliffs', depth: 0.15, height: '35%' },
      { id: 'pool', depth: 0.2, height: '20%' },
    ],
    baseColor: '#64B5F6'
  }
};

// Layer component for parallax effect
const ParallaxLayer = ({ layer, sceneName, mouseX, mouseY, baseColor }) => {
  const { id, depth, height } = layer;
  const imagePath = `/assets/backgrounds/${sceneName}/${id}.png`;
  
  // Generate placeholder styles based on layer type
  const getPlaceholderStyles = () => {
    switch(id) {
      case 'sky':
        return `bg-gradient-to-b from-[${baseColor}] to-[#FFFFFF]`;
      case 'far-mountains':
      case 'far-trees':
      case 'far-cliffs':
        return 'bg-gray-700';
      case 'mid-mountains':
      case 'mid-trees':
      case 'mid-cliffs':
        return 'bg-gray-800';
      case 'front-mountains':
      case 'front-trees':
      case 'front-cliffs':
        return 'bg-gray-900';
      case 'lake':
      case 'pool':
        return 'bg-blue-900';
      case 'waterfall':
        return 'bg-blue-200';
      case 'foreground':
        return 'bg-green-900';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      className={`absolute bottom-0 w-full papercut-layer`}
      style={{
        height,
        x: mouseX * -depth,
        y: mouseY * -(depth / 2)
      }}
    >
      {/* This div will be replaced with your PNG image */}
      <div className={`absolute inset-0 ${getPlaceholderStyles()} opacity-80`}>
        {/* Placeholder text to identify the layer */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
          {id}.png
        </div>
      </div>
      
      {/* Special effects for certain layers */}
      {id === 'waterfall' && (
        <div className="absolute left-[45%] right-[45%] top-0 bottom-0 bg-blue-200 opacity-80 animate-pulse"></div>
      )}
      {(id === 'lake' || id === 'pool') && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-50"></div>
      )}
    </motion.div>
  );
};

// Scene component that renders all layers for a specific profile
const ParallaxScene = ({ sceneName, layers, mouseX, mouseY, baseColor }) => {
  return (
    <div className="absolute inset-0 overflow-hidden papercut-scene">
      {/* Base sky gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b from-[${baseColor}] to-[#FFFFFF]`} />
      
      {/* Special elements like sun or clouds */}
      {sceneName === 'mountain' && (
        <motion.div 
          className="absolute w-32 h-32 rounded-full bg-yellow-200" 
          style={{ 
            top: '15%', 
            left: '75%',
            boxShadow: '0 0 60px 30px rgba(255, 236, 173, 0.4)',
            x: mouseX * -0.02,
            y: mouseY * -0.01
          }}
        />
      )}
      
      {sceneName === 'forest' && (
        <>
          <motion.div 
            className="absolute w-40 h-16 rounded-full bg-white opacity-80" 
            style={{ 
              top: '15%', 
              left: '20%',
              x: mouseX * -0.02,
              y: mouseY * -0.01
            }}
          />
          <motion.div 
            className="absolute w-56 h-20 rounded-full bg-white opacity-90" 
            style={{ 
              top: '25%', 
              left: '60%',
              x: mouseX * -0.03,
              y: mouseY * -0.015
            }}
          />
        </>
      )}
      
      {/* Render all parallax layers */}
      {layers.map((layer) => (
        <ParallaxLayer 
          key={layer.id}
          layer={layer}
          sceneName={sceneName}
          mouseX={mouseX}
          mouseY={mouseY}
          baseColor={baseColor}
        />
      ))}
    </div>
  );
};

// Main component
const ParallaxBackground = () => {
  const { currentProfile } = useProfile();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Calculate mouse position relative to center of screen
      const x = event.clientX - window.innerWidth / 2;
      const y = event.clientY - window.innerHeight / 2;
      setMouseX(x);
      setMouseY(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Get scene configuration based on current profile
  const getSceneConfig = () => {
    return SCENE_LAYERS[currentProfile] || SCENE_LAYERS[PROFILES.EMPLOYER];
  };

  const sceneConfig = getSceneConfig();

  return (
    <div className="absolute inset-0 z-0">
      <ParallaxScene 
        sceneName={sceneConfig.name}
        layers={sceneConfig.layers}
        mouseX={mouseX}
        mouseY={mouseY}
        baseColor={sceneConfig.baseColor}
      />
      {/* Glassy overlay for macOS effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />
    </div>
  );
};

export default ParallaxBackground;
