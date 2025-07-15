import { useState, useEffect } from 'react'
import './index.css'

// Context providers
import { DeviceProvider } from './contexts/DeviceContext'
import { ProfileProvider } from './contexts/ProfileContext'

// Components
import DesktopUI from './components/desktop/DesktopUI'
import MobileWrapper from './components/mobile/MobileWrapper'
import MiniMe from './components/shared/MiniMe'

// Boot and login screens
const BootScreen = ({ onComplete }) => {
  useEffect(() => {
    // Simulate boot process
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-6xl mb-8">AtifOS</div>
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      <div className="mt-8 text-xl">Loading personal experience...</div>
    </div>
  )
}

const LoginScreen = ({ onLogin }) => {
  const profiles = [
    { id: 'Employer', name: 'Employer', emoji: '👔', description: 'Professional view focused on skills and experience' },
    { id: 'Friends', name: 'Friends', emoji: '😎', description: 'Casual view with personal projects and interests' },
    { id: 'Family', name: 'Family', emoji: '👨‍👩‍👦', description: 'Personal view with family photos and stories' },
  ]
  
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 text-white p-4">
      <div className="text-4xl mb-8">Welcome to AtifOS</div>
      <div className="text-xl mb-12">Choose your experience:</div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {profiles.map((profile) => (
          <div 
            key={profile.id}
            className="glass-effect p-6 rounded-xl cursor-pointer transition-transform hover:scale-105"
            onClick={() => onLogin(profile.id)}
          >
            <div className="text-5xl mb-4">{profile.emoji}</div>
            <div className="text-xl font-bold mb-2">{profile.name}</div>
            <div className="text-sm">{profile.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [bootComplete, setBootComplete] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState('Employer')
  
  // Handle boot completion
  const handleBootComplete = () => {
    setBootComplete(true)
  }
  
  // Handle login
  const handleLogin = (profileId) => {
    setSelectedProfile(profileId)
    setLoggedIn(true)
  }

  // Show boot screen
  if (!bootComplete) {
    return <BootScreen onComplete={handleBootComplete} />
  }
  
  // Show login screen
  if (!loggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  // Show main OS interface
  return (
    <ProfileProvider>
      <DeviceProvider>
        {/* Main OS components */}
        <DesktopUI />
        <MobileWrapper />
        
        {/* Shared components */}
        <MiniMe isVisible={true} />
      </DeviceProvider>
    </ProfileProvider>
  )
}

export default App
