import { useProfile, PROFILES } from '../../contexts/ProfileContext';
import { useState, useEffect } from 'react';
import DotGrid from '../../blocks/Backgrounds/DotGrid/DotGrid';

// Color configuration for each profile
const PROFILE_COLORS = {
  [PROFILES.EMPLOYER]: {
    baseColor: '#1E1E2E',  // Dark base color from image
    activeColor: '#6D28D9'  // Purple active color from image
  },
  [PROFILES.FRIENDS]: {
    baseColor: '#1E1E2E',  // Same base color for all profiles
    activeColor: '#10B981'  // Green active color for friends
  },
  [PROFILES.FAMILY]: {
    baseColor: '#1E1E2E',  // Same base color for all profiles
    activeColor: '#F97316'  // Orange active color for family
  }
};

const DotGridBackground = () => {
  const { currentProfile } = useProfile();
  const [dpr, setDpr] = useState(1);
  
  // Set device pixel ratio for better rendering
  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
  }, []);
  
  // Get colors based on current profile
  const getProfileColors = () => {
    return PROFILE_COLORS[currentProfile] || PROFILE_COLORS[PROFILES.EMPLOYER];
  };

  const colors = getProfileColors();

  return (
    <div className="absolute inset-0 z-0">
      <DotGrid 
        dotSize={Math.max(2, 3 / dpr)}  // Adjust dot size based on device pixel ratio
        gap={Math.max(6, 10 / dpr)}     // Adjust gap based on device pixel ratio
        baseColor={colors.baseColor}
        activeColor={colors.activeColor}
        proximity={120}       // From image
        speedTrigger={80}     // Keep original
        shockRadius={250}     // From image
        shockStrength={5}     // From image
        maxSpeed={4000}       // Keep original
        resistance={750}      // From image
        returnDuration={1.5}  // From image
        className="bg-black"  // Simple black background
        style={{
          // Add custom styles for higher quality rendering
          imageRendering: 'high-quality',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      />
      {/* Glow overlay for active dots */}
      <div className="absolute inset-0 pointer-events-none" 
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.activeColor}10 0%, transparent 70%)`,
          boxShadow: `inset 0 0 150px ${colors.activeColor}30`,
          mixBlendMode: 'screen'
        }} 
      />
      {/* Additional glow for active color */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          boxShadow: `0 0 40px 5px ${colors.activeColor}`,
          mixBlendMode: 'screen'
        }}
      />
      {/* Glassy overlay for macOS effect */}
      <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5" />
    </div>
  );
};

export default DotGridBackground;
