import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'

// Context providers
import { DeviceProvider } from './contexts/DeviceContext'
import { ProfileProvider } from './contexts/ProfileContext'
import { AppStateProvider } from './contexts/AppStateContext'

// Components
import DesktopUI from './components/desktop/DesktopUI'
import MobileWrapper from './components/mobile/MobileWrapper'
import MiniMe from './components/shared/MiniMe'

// Welcome taglines for boot screen
const welcomeTaglines = [
  "Initializing personal experience...",
  "Loading skills and achievements...",
  "Preparing interactive resume...",
  "Calibrating personality modules...",
  "Activating Mini-Me assistant..."
]

// Boot screen component
const BootScreen = ({ onComplete }) => {
  const [currentTagline, setCurrentTagline] = useState(0)
  const [bootProgress, setBootProgress] = useState(0)
  
  useEffect(() => {
    // Simulate boot process with progress
    const progressInterval = setInterval(() => {
      setBootProgress(prev => {
        const newProgress = prev + 1
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => onComplete(), 500) // Short delay after reaching 100%
          return 100
        }
        return newProgress
      })
    }, 30) // Update every 30ms for a total of ~3 seconds
    
    // Rotate through taglines
    const taglineInterval = setInterval(() => {
      setCurrentTagline(prev => (prev + 1) % welcomeTaglines.length)
    }, 1200)
    
    return () => {
      clearInterval(progressInterval)
      clearInterval(taglineInterval)
    }
  }, [])
  
  return (
    <motion.div 
      className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-6xl md:text-7xl font-bold mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 10,
          delay: 0.3 
        }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          AtifOS
        </span>
      </motion.div>
      
      <motion.div 
        className="w-24 h-24 mb-8 relative"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
        <div 
          className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500"
          style={{ 
            transform: `rotate(${bootProgress * 3.6}deg)`,
            transition: 'transform 0.3s ease' 
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-mono">
          {bootProgress}%
        </div>
      </motion.div>
      
      <motion.div 
        className="h-8 text-xl text-center text-blue-300"
        key={currentTagline}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {welcomeTaglines[currentTagline]}
      </motion.div>
    </motion.div>
  )
}

// Login screen component
const LoginScreen = ({ onLogin }) => {
  const profiles = [
    { 
      id: 'Employer', 
      name: 'Employer', 
      emoji: '👔', 
      description: 'Professional view focused on skills and experience',
      details: 'See my professional achievements, technical skills, and work history optimized for potential employers.'
    },
    { 
      id: 'Friends', 
      name: 'Friends', 
      emoji: '😎', 
      description: 'Casual view with personal projects and interests',
      details: 'Discover my side projects, hobbies, and interests in a more relaxed and casual presentation.'
    },
    { 
      id: 'Family', 
      name: 'Family', 
      emoji: '👨‍👩‍👦', 
      description: 'Personal view with family photos and stories',
      details: 'Browse family photos, personal stories, and life events in a warm, intimate presentation.'
    },
  ]
  
  const [hoveredProfile, setHoveredProfile] = useState(null)
  
  return (
    <motion.div 
      className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 text-white p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-5xl md:text-6xl font-bold mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        Welcome to AtifOS
      </motion.div>
      
      <motion.div 
        className="text-xl mb-8 text-blue-200"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Choose your experience:
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4">
        {profiles.map((profile, index) => (
          <motion.div 
            key={profile.id}
            className={`glass-effect p-6 rounded-xl cursor-pointer transition-all duration-300 ${hoveredProfile === profile.id ? 'bg-opacity-30' : 'bg-opacity-20'}`}
            onClick={() => onLogin(profile.id)}
            onMouseEnter={() => setHoveredProfile(profile.id)}
            onMouseLeave={() => setHoveredProfile(null)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="text-6xl mb-6"
              animate={{ 
                rotate: hoveredProfile === profile.id ? [0, -10, 10, -5, 5, 0] : 0 
              }}
              transition={{ duration: 0.5 }}
            >
              {profile.emoji}
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-3">{profile.name}</h2>
            <p className="text-sm mb-4 text-blue-100">{profile.description}</p>
            
            <motion.div 
              className="text-xs text-gray-300 border-t border-gray-500 pt-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredProfile === profile.id ? 1 : 0.7 }}
            >
              {profile.details}
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-8 text-sm text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Tap or click a profile to continue
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [bootComplete, setBootComplete] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState('Employer')
  const [appState, setAppState] = useState('boot') // 'boot', 'login', or 'os'
  
  // Handle boot completion
  const handleBootComplete = () => {
    setBootComplete(true)
    setAppState('login')
  }
  
  // Handle login
  const handleLogin = (profileId) => {
    setSelectedProfile(profileId)
    setLoggedIn(true)
    setAppState('os')
  }

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {appState === 'boot' && (
          <BootScreen key="boot" onComplete={handleBootComplete} />
        )}
        
        {appState === 'login' && (
          <LoginScreen key="login" onLogin={handleLogin} />
        )}
        
        {appState === 'os' && (
          <motion.div
            key="os"
            className="os-container w-screen h-screen overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileProvider initialProfile={selectedProfile}>
              <DeviceProvider>
                <AppStateProvider>
                  {/* Main OS components */}
                  <DesktopUI />
                  <MobileWrapper />
                  
                  {/* Shared components */}
                  <MiniMe isVisible={true} />
                </AppStateProvider>
              </DeviceProvider>
            </ProfileProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
