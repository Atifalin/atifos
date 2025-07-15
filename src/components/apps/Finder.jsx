import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../contexts/ProfileContext';

const Finder = () => {
  const { currentProfile } = useProfile();
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // list or grid

  // Sample resume data
  const resumeData = {
    overview: {
      name: "Mohammed Atif Ali Neranki",
      title: "Strategic Production Planner | MBA | Supply Chain & Digital Transformation",
      summary: "Experienced Production Planner and Supply Chain Leader blending AI-driven analytics and strategic vision to optimize operations across global and Indian markets.",
      location: "Bengaluru, Karnataka, India",
      contact: {
        phone: "+91-XXXXXXXXXX",
        email: "atifalin09@gmail.com",
        linkedin: "http://www.linkedin.com/in/atifalin"
      },
      achievements: [
        "Reduced inventory carrying cost by 12% through AI-powered safety-stock optimization at Kruger.",
        "Managed 398K+ tons of inventory annually (≈ $318 M USD) with near-perfect OTIF performance.",
        "Built real-time Power BI dashboards that cut decision cycles by 40% for production scheduling.",
        "Led SAP/Oracle ERP enhancements that improved master-data accuracy from 87% to 99%."
      ]
    },
    sections: [
      { 
        id: "experience", 
        title: "Experience", 
        icon: "💼",
        content: [
          {
            title: "Production Planner",
            company: "Kruger (Canada)",
            period: "OCT 2022 – Present",
            description: "Managed annual inventory exceeding 398 K tons (≈ $318 M USD) and assets approaching $1 B USD over 3 years while sustaining OTIF >98%."
          },
          {
            title: "Marketing Intern",
            company: "Jindal Steelworks (India)",
            period: "DEC 2018 – MAR 2019",
            description: "Supported ERP (Oracle E-Biz) migration and created sales analytics reports reducing manual effort by 30%."
          }
        ]
      },
      { 
        id: "education", 
        title: "Education", 
        icon: "🎓",
        content: [
          {
            degree: "Master of Business Administration",
            institution: "Thompson Rivers University, Kamloops, Canada",
            year: "2022",
            details: "Focus on Supply Chain Management and Business Analytics"
          },
          {
            degree: "Bachelor of Business Administration",
            institution: "AIMS Institute, Bangalore University, Bangalore, India",
            year: "2019",
            details: "Graduated with honors"
          }
        ]
      },
      { 
        id: "skills", 
        title: "Skills", 
        icon: "⚡",
        content: [
          { category: "Analytics & Data Science", skills: ["Python (Pandas, NumPy)", "Power BI", "Advanced Excel", "Predictive Analytics"] },
          { category: "Supply Chain & Operations", skills: ["Production Planning", "Inventory Management", "S&OP", "Process Automation"] },
          { category: "Programming & Tech", skills: ["C", "C++", "Java", "JavaScript/TypeScript", "React Native", "Flutter", "SQL"] }
        ]
      },
      { 
        id: "projects", 
        title: "Projects", 
        icon: "🚀",
        content: [
          {
            name: "GhantaPL",
            description: "Fantasy football auction platform with AI-powered team analysis (React Native, Supabase, Claude).",
            technologies: ["React Native", "Supabase", "Claude"]
          },
          {
            name: "Credit Card Tracker",
            description: "Mobile app for multi-card spend analytics with interactive dashboards (React Native, TypeScript).",
            technologies: ["React Native", "TypeScript"]
          }
        ]
      },
      { 
        id: "certifications", 
        title: "Certifications", 
        icon: "🏆",
        content: [
          { name: "Six Sigma White Belt", issuer: "Kruger", year: "2022" },
          { name: "Google Analytics Individual Qualification", issuer: "Google", year: "2020" },
          { name: "Advanced Microsoft Excel", issuer: "Microsoft", year: "2019" }
        ]
      },
      { 
        id: "languages", 
        title: "Languages", 
        icon: "🌐",
        content: [
          { language: "Urdu", proficiency: "Native" },
          { language: "English", proficiency: "Fluent" },
          { language: "Hindi", proficiency: "Conversational" }
        ]
      }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search"
              className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                onClick={() => setSearchQuery("")}
              >
                ×
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 bg-gray-800 border-r border-gray-700 overflow-y-auto p-2">
          <div className="mb-4">
            <h3 className="text-xs uppercase text-gray-500 font-semibold px-2 mb-2">Favorites</h3>
            <div 
              className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${activeSection === "overview" ? "bg-blue-500 bg-opacity-70 text-white" : "text-gray-300 hover:bg-gray-700"}`}
              onClick={() => setActiveSection("overview")}
            >
              <span className="text-lg">👤</span>
              <span>Overview</span>
            </div>
            <div 
              className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${activeSection === "full-resume" ? "bg-blue-500 bg-opacity-70 text-white" : "text-gray-300 hover:bg-gray-700"}`}
              onClick={() => setActiveSection("full-resume")}
            >
              <span className="text-lg">📄</span>
              <span>Full Resume</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs uppercase text-gray-500 font-semibold px-2 mb-2">Resume Sections</h3>
            {resumeData.sections.map((section) => (
              <div 
                key={section.id}
                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${activeSection === section.id ? "bg-blue-500 bg-opacity-70 text-white" : "text-gray-300 hover:bg-gray-700"}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="text-lg">{section.icon}</span>
                <span>{section.title}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1 overflow-y-auto bg-gray-900 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeSection === "overview" && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-3xl mx-auto"
                >
                  <div className="flex items-start">
                    <div className="mr-6">
                      <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-5xl overflow-hidden">
                        <img src="/assets/Mo.png" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2">{resumeData.overview.name}</motion.h1>
                      <motion.h2 variants={itemVariants} className="text-xl text-blue-400 mb-4">{resumeData.overview.title}</motion.h2>
                      <motion.p variants={itemVariants} className="text-gray-300 mb-6">{resumeData.overview.summary}</motion.p>
                      
                      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">📍</span>
                          <span className="text-gray-300">{resumeData.overview.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">📧</span>
                          <span className="text-gray-300">{resumeData.overview.contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">📱</span>
                          <span className="text-gray-300">{resumeData.overview.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">🔗</span>
                          <span className="text-gray-300">{resumeData.overview.contact.linkedin}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {resumeData.sections.map((section) => (
                activeSection === section.id && (
                  <motion.div 
                    key={section.id}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center mb-6">
                      <span className="text-3xl mr-3">{section.icon}</span>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>
                    
                    {section.id === "experience" && (
                      <div className="space-y-6">
                        {section.content.map((exp, index) => (
                          <motion.div key={index} variants={itemVariants} className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <h3 className="text-xl font-semibold text-blue-400">{exp.title}</h3>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300">{exp.company}</span>
                              <span className="text-gray-400 text-sm">{exp.period}</span>
                            </div>
                            <p className="text-gray-300">{exp.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === "education" && (
                      <div className="space-y-6">
                        {section.content.map((edu, index) => (
                          <motion.div key={index} variants={itemVariants} className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <h3 className="text-xl font-semibold text-blue-400">{edu.degree}</h3>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300">{edu.institution}</span>
                              <span className="text-gray-400 text-sm">{edu.year}</span>
                            </div>
                            <p className="text-gray-300">{edu.details}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === "skills" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.content.map((skillGroup, index) => (
                          <motion.div key={index} variants={itemVariants} className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <h3 className="text-xl font-semibold text-blue-400 mb-3">{skillGroup.category}</h3>
                            <div className="flex flex-wrap gap-2">
                              {skillGroup.skills.map((skill, i) => (
                                <span key={i} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === "projects" && (
                      <div className="space-y-6">
                        {section.content.map((project, index) => (
                          <motion.div key={index} variants={itemVariants} className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <h3 className="text-xl font-semibold text-blue-400">{project.name}</h3>
                            <p className="text-gray-300 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, i) => (
                                <span key={i} className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === "certifications" && (
                      <div className="space-y-4">
                        {section.content.map((cert, index) => (
                          <motion.div key={index} variants={itemVariants} className="bg-gray-800 rounded-lg p-4 shadow-md flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-semibold text-blue-400">{cert.name}</h3>
                              <p className="text-gray-300">{cert.issuer}</p>
                            </div>
                            <span className="text-gray-400">{cert.year}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === "languages" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {section.content.map((lang, index) => (
                          <motion.div key={index} variants={itemVariants} className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <h3 className="text-lg font-semibold text-blue-400">{lang.language}</h3>
                            <p className="text-gray-300">{lang.proficiency}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              ))}
              
              {activeSection === "full-resume" && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-full flex flex-col items-center justify-center"
                >
                  <motion.div variants={itemVariants} className="text-center mb-8">
                    <span className="text-5xl mb-4 block">📄</span>
                    <h2 className="text-2xl font-bold mb-2">Full Resume</h2>
                    <p className="text-gray-400 mb-6">View or download the complete resume</p>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex space-x-4">
                    <a 
                      href="/assets/Resume_Mohammed_Atif_Ali_Neranki.pdf" 
                      target="_blank"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span>View PDF</span>
                    </a>
                    
                    <a 
                      href="/assets/Resume_Mohammed_Atif_Ali_Neranki.pdf" 
                      download
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Download PDF</span>
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Finder;
