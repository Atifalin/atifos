# AtifOS

AtifOS is an interactive, OS-style personal resume built using React, inspired by macOS 26's Liquid Glass design. Instead of a traditional resume, users interact with a desktop-like environment where each "app" explores part of your story: work, skills, photos, projects, etc.

## 🎯 Key Features

- **OS-Like Experience**: A complete desktop environment with apps, dock, and window management
- **Adaptive Design**: Seamless experience on both desktop and mobile devices
- **Mini-Me Assistant**: Floating cartoon assistant to guide users
- **OpenAI-Powered Terminal**: Interactive terminal for resume exploration
- **Glassmorphism UI**: Modern, translucent interface inspired by macOS

## 🛠️ Tech Stack

- **Framework**: React with Vite
- **Styling**: Tailwind CSS / SCSS + Glassmorphism
- **Animation**: Spline (boot/logo), GIFs (Mini-Me), Framer Motion
- **3D Effects**: Three.js (desktop background parallax)
- **AI Integration**: OpenAI API (resume-aware terminal)
- **Hosting**: Vercel / Netlify

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Adaptive UX Strategy

AtifOS is built with two UX modes:

1. **Full OS Mode** (desktop/tablet)
   - Fully immersive desktop environment
   - Draggable/resizable app windows
   - Animated dock, boot screen, and 3D background

2. **Mobile OS Mode** (smartphones)
   - Adaptive app-style layout (like a mobile OS launcher)
   - Full-screen panels instead of draggable windows
   - Chat-style interface for terminal

## 📊 Project Progress

- ✅ **M1: Setup & CI/CD** - Project structure, GitHub repo, Tailwind CSS, Vercel deployment
- ✅ **M2: Boot + Login** - Enhanced boot animation and login transitions
- ✅ **M3: Shell & Finder** - Desktop shell, window management, Finder app
  - ✅ Window controls (minimize, maximize, close) and dragging
  - ✅ macOS Sonoma-inspired Liquid Glass UI
  - ✅ Resume integration in Finder and ResumeViewer
- 🔄 **M4: Terminal & MiniMe** - Coming soon
- 🔄 **M5: Mobile Experience** - Coming soon
- 🔄 **M6: Polish & Deploy** - In progress

## 🖼️ Screenshots

*Screenshots will be added after deployment*

## 🔗 Live Demo

Visit [AtifOS](https://atif-os.vercel.app) to see the live demo.

- 📝 **Future Milestones**
  - M4: Terminal + OpenAI
  - M5: Mini-Me Assistant
  - M6: Apps (Photos, Projects, Skills)
  - M7: Mobile Experience
  - M8: Polish & Performance

## 🌐 Deployment

The project is deployed at:
- [https://atif-os.vercel.app](https://atif-os.vercel.app)
- Custom domain: atifos.atifalin.in (pending DNS configuration)
