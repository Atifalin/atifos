📌 Project Summary
AtifOS is an interactive, OS-style personal resume built using React, inspired by macOS 26’s Liquid Glass design. Instead of a traditional resume, users interact with a desktop-like environment where each “app” explores part of your story: work, skills, photos, projects, etc. The system features animations, a floating cartoon assistant, an OpenAI-powered terminal, and a whimsical, personalized interface.

🎯 Key Goals
Build a resume that feels like an experience — not a webpage

Use OS metaphors to guide users through resume sections

Seamlessly blend interactivity, 3D design, and AI

Create adaptive layouts that deliver a great experience on all devices

🛠️ Tech Stack
Layer	Tool
Framework	React
Styling	Tailwind CSS / SCSS + Glassmorphism
Animation	Spline (boot/logo), GIFs (Mini-Me), Framer Motion
3D Effects	Three.js (desktop background parallax)
AI Integration	OpenAI API (resume-aware terminal)
Hosting	Vercel / Netlify
Responsive UX	React + custom isMobile flag + Tailwind media queries

🌐 Adaptive UX Strategy
From day one, we’ll build with two UX modes in mind:

1. Full OS Mode (for desktop/tablet users)
Fully immersive desktop environment

Draggable/resizable app windows

Animated dock, boot screen, and 3D background

Terminal + Mini-Me assistant

2. Mobile OS Mode (for smartphones)
Adaptive app-style layout (like a mobile OS launcher)

No draggable windows — uses full-screen panels

Terminal turns into chat-style interface

Same theming + assistant + tone

No “rotate to view” prompts or forced landscape

🔍 Features Overview
🔹 1. Boot Screen (shared)
animation of AtifOS logo

Loading animation and welcome taglines

🔹 2. Login Screen (shared)
Choose one of three profiles:
Employer 👔, Friends 😎, Family 👨‍👩‍👦

Changes Mini-Me avatar, tone, and some visible apps (Use emoji for development - refine before finalizing)

🔹 3. Desktop (desktop/tablet only)
Mac-style glassy background (Three.js parallax)

Top bar with time/Wi-Fi/profile name etc

Bottom dock with interactive app icons

Draggable, floating app windows

🔹 4. Mini-Me Assistant (shared) 
Floating cartoon version of you (GIF-based)

Onboarding, tips, jokes, easter egg hints

Different expressions/clothes by login profile

Can be summoned with a terminal command

🔹 5. Apps (desktop = windowed, mobile = full screen)
App	Purpose	Desktop	Mobile
Finder	Resume explorer	Window	Expandable card sections
Terminal	Resume Q&A + GPT	Terminal UI	Chat UI
Resume Viewer	Styled resume/PDF	Window	Scroll view
Photos	Life/work gallery	Gallery wall	Tap-to-expand
About This OS	Fun personal bio	Popup	Full screen card
Settings	Language, theme, personality toggles	Window	Modal/switches
Trash	Deprecated skills / failed projects	Window	List with icons

🔹 6. Terminal + OpenAI/Claude
Responds to commands like:

vbnet
Copy
Edit
show projects
export resume
summon mini-me and some other commands basic windows cmd or mac os terminal commands - replies with a funny joke or easter egg hint
GPT system prompt scoped to your resume data

Switches between desktop terminal UI and mobile chat style

🔹 7. 3D and Animation Layers
Element	Tool	Device Support
Boot Animation	- a breathing logo and then smooth transition to login screen
Desktop BG	Three.js	✅ Desktop/tablet only
Mini-Me	GIF / PNG sequence	✅ All
App transitions	Framer Motion - glasslike	✅ Adaptive

📱 Mobile Mode UI Summary
Feature	Design
Login	Vertical profile selection
Desktop	Replaced with app grid
Apps	Full-screen cards/panels
Terminal	GPT chat-style interface
Navigation	Sticky bottom navbar
Mini-Me	Bubble assistant, expandable
Resume	Scrollable PDF/text
Visual Theme	Same colors, blur, gradients

📁 File/Component Structure (React)

/src
  /components
    /desktop
      DesktopUI, AppWindow, Dock, TopBar
    /mobile
      MobileWrapper, AppGrid, BottomNav, MobileAppPanel
    /shared
      MiniMe, Terminal, Photos, ResumeViewer
  /contexts
    ProfileContext, DeviceContext
  /hooks
    useDeviceType, useAppState
  /assets
    /images, /gifs, /spline, /icons
  /styles
    globals.css, tailwind.config.js
App.jsx
main.jsx

🧱 Build Plan (Phases)
Phase	Deliverable
✅ Planning	Mockup, QRD, component map
Phase 1	Boot + Login + device detection logic
Phase 2	Desktop: Top bar, Dock, window shell
Phase 3	Mobile: App grid UI + responsive shell
Phase 4	Terminal + OpenAI integration (dual UI)
Phase 5	Mini-Me assistant (GIF + text logic)
Phase 6	Resume, Finder, Photos, Settings
Phase 7	Polish, 3D tuning, Easter eggs, deploy

✅ Notes to windsurf
All components must be device-aware: mobile-first is fine, but build modularly.

Avoid draggable or hover-based logic in mobile layout

Shared content (text, images, assistant responses) should live in a single source and be presented differently across layouts

Prioritize readability, scrollability, and tap targets on mobile

Maintain visual parity between modes with consistent theming

write clean and readable code

let me know if you have any questions - add assets to assets folder if not available

any steps with deploying for testing - let me know

UX/UI Details
Glassmorphism: Multi-layered backdrop-filter; consistent corner radius (8–12px)

Motion:

Window open/close: 200–300ms ease-in-out

Dock magnifier: spring animation

Mini-Me pop: subtle scale bounce

Sound (optional): Light click & pop effects, boot chime, terminal typing

Deployment & Vercel Setup
GitHub → Vercel: Connect repo, enable preview deploys.

Env Vars: Set OPENAI_API_KEY in Vercel dashboard.

Edge Function: /api/chat for GPT proxy.

Custom Domain: atifos.atifalin.in with auto SSL.


| Milestone                   | Priority |
| --------------------------- | ----------- |
| **M1: Setup & CI/CD**       | 1         |
| **M2: Boot + Login**        | 2           |
| **M3: Shell & Finder**      | 2         |
| **M4: Photos + Background** | 2           |
| **M5: Terminal & GPT**      | 2           |
| **M6: Mini-Me & Tutorial**  | 2           |
| **M7: Mobile Mode**         | 2         |
| **M8: Polish & Deploy**     | 2           |

end of document