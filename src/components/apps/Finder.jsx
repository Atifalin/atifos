import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../contexts/ProfileContext';
import { useDevice } from '../../contexts/DeviceContext';

const Finder = () => {
  const { currentProfile } = useProfile();
  const { isMobile } = useDevice();
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  // Store layout mode per section
  const [sectionViewMode, setSectionViewMode] = useState({}); // { sectionId: 'list' | 'grid' }
  // Track which experience card is expanded
  const [expandedExperience, setExpandedExperience] = useState(null);
  const searchInputRef = useRef(null);

  // Helper to get view mode for current section
  const getViewMode = () => sectionViewMode[activeSection] || 'list';
  const setViewMode = (mode) => setSectionViewMode((prev) => ({ ...prev, [activeSection]: mode }));

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
            description: [
              "Managed annual inventory exceeding 398,000 tons (valued at over $318 million USD/year), overseeing assets worth nearly $1 billion USD over 3 years.",
              "Leveraged AI-driven analytics and predictive modeling to optimize production schedules and inventory management, resulting in data-backed decision making and improved forecast accuracy.",
              "Coordinated and executed production scheduling activities using advanced ERP systems, ensuring optimal resource utilization and on-time delivery.",
              "Developed and maintained master data (BOMs, routings) and capacity requirements plans to support dynamic production environments.",
              "Built interactive dashboards in Power BI and Excel for live inventory breakdowns, sales vs production, demand vs supply timelines, and real-time order processing, enabling real-time business intelligence across the organization.",
              "Applied machine learning techniques to identify demand patterns, reduce wastage, and enhance supply chain agility.",
              "Analyzed inventory management metrics, identified bottlenecks, and implemented process improvements to enhance operational efficiency.",
              "Collaborated with manufacturing, quality control, warehouse, and procurement teams to drive cross-functional effectiveness and resolve production challenges.",
              "Conducted “what-if” scenario analyses and provided strategic recommendations to management for capacity planning and risk mitigation.",
              "Automated and streamlined reporting processes using SAP and Excel, delivering actionable insights for continuous improvement.",
              "Audited and ensured inventory integrity and accuracy, including performing production and scrap reporting.",
              "Created and optimized production schedules, balancing customer demand, inventory targets, and cost control.",
              "Developed and distributed monthly reports on inventory, production conformance, and supply chain KPIs to senior leadership.",
              "Drove process improvements in demand and production planning, contributing to company-wide cost savings and service level enhancements.",
              "Achieved year-end inventory targets, surpassing sales targets by 10,000+ Tons.",
              "",
              "Key Achievements:",
              "- Reduced inventory holding costs by 12% through implementation of AI-powered demand forecasting and process automation.",
              "- Designed and deployed real-time Power BI dashboards, improving management visibility and speeding up decision cycles by 40%.",
              "- Recognized by senior leadership for driving digital transformation initiatives and fostering a data-driven culture across planning and operations."
            ]
          },
          {
            title: "Marketing Intern",
            company: "Jindal Steelworks (India)",
            period: "DEC 2018 – MAR 2019",
            description: "Supported ERP (Oracle E-Biz) migration and created sales analytics reports reducing manual effort by 30%."
          },
          {
            title: "Strategic Consultant",
            company: "Kamloops Film Society",
            period: "MAR 2022 – AUG 2022",
            description: "Presented post-COVID business models to the board; conducted gap analysis and proposed new revenue streams."
          },
          {
            title: "Strategic Consultant",
            company: "House of Carmond, Kamloops",
            period: "MAR 2022 – AUG 2022",
            description: "Delivered market reports, demographic analysis and feasibility studies to management."
          },
          {
            title: "Photolab Specialist + Tech Specialist",
            company: "London Drugs (Canada)",
            period: "SEP 2021 – OCT 2022",
            description: "Managed photolab operations and provided technical support, demonstrating customer service excellence while studying."
          },
          {
            title: "Sales Associate",
            company: "Total Pet (Canada)",
            period: "FEB 2021 – JUL 2021",
            description: "Handled retail sales, inventory management and customer engagement."
          },
          {
            title: "Product Process Specialist",
            company: "Best Buy Canada",
            period: "OCT 2020 – JAN 2021",
            description: "Oversaw product process flows and supported merchandising teams."
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

  // Filter and highlight content based on search query
  const highlightMatch = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-300 bg-opacity-40 text-yellow-900 px-1 rounded">{part}</mark> : part
    );
  };

  const filteredSections = resumeData.sections.filter(section => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    // Check if section title matches
    if (section.title.toLowerCase().includes(query)) return true;
    // Check if any content matches based on section type
    if (section.content) {
      return section.content.some(item => {
        if (typeof item === 'object') {
          return Object.values(item).some(value => 
            typeof value === 'string' && value.toLowerCase().includes(query)
          );
        }
        return false;
      });
    }
    return false;
  });

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white/20 via-white/10 to-blue-200/10 backdrop-blur-2xl text-gray-100 overflow-hidden border border-white border-opacity-25 shadow-2xl transition-all duration-300 relative">
      {/* Finder toolbar - responsive for mobile/desktop */}
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} justify-between px-4 py-2 border-b border-white border-opacity-25 flex-shrink-0 bg-white/10 backdrop-blur-xl transition-all duration-300`}>
        <div className={`flex items-center ${isMobile ? 'mb-2 overflow-x-auto pb-1 w-full' : 'space-x-2'} transition-all duration-300`}>
          <button 
            className={`p-1 rounded ${activeSection === 'overview' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
            onClick={() => setActiveSection('overview')}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          
          {resumeData.sections.map(section => (
            <button 
              key={section.id}
              className={`p-1 rounded ${isMobile ? 'mx-1' : ''} ${activeSection === section.id ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="text-lg">{section.icon}</span>
            </button>
          ))}
        </div>
        
        {/* Search box and layout buttons removed */}
      </div>

      <div className={`flex-1 ${isMobile ? 'flex flex-col' : 'flex'} overflow-hidden min-h-0`}>
        {/* Sidebar - conditionally shown based on device */}
        {!isMobile && (
          <div className="w-56 bg-white bg-opacity-10 border-r border-white border-opacity-20 overflow-y-auto p-2 flex-shrink-0">
            <div className="mb-4">
              <h3 className="text-xs uppercase text-white text-opacity-60 font-semibold px-2 mb-2">Favorites</h3>
              <div 
                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${activeSection === "overview" ? "bg-white bg-opacity-20 text-white" : "text-gray-100 hover:bg-white hover:bg-opacity-10"}`}
                onClick={() => setActiveSection("overview")}
              >
                <span className="text-lg">👤</span>
                <span>Overview</span>
              </div>
              <div 
                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${activeSection === "full-resume" ? "bg-white bg-opacity-20 text-white" : "text-gray-100 hover:bg-white hover:bg-opacity-10"}`}
                onClick={() => setActiveSection("full-resume")}
              >
                <span className="text-lg">📄</span>
                <span>Full Resume</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs uppercase text-white text-opacity-60 font-semibold px-2 mb-2">Resume Sections</h3>
              {resumeData.sections.map((section) => (
                <div 
                  key={section.id}
                  className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${activeSection === section.id ? "bg-white bg-opacity-20 text-white" : "text-gray-100 hover:bg-white hover:bg-opacity-10"}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span>{section.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Content area - responsive for mobile/desktop */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-0">
          {/* Mobile section selector (only shown on mobile) */}
          {isMobile && (
            <div className="mb-4 bg-white bg-opacity-10 rounded-lg p-2 border border-white border-opacity-20 flex-shrink-0">
              <select 
                className="w-full bg-transparent text-white border-0 focus:ring-0 focus:outline-none"
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
              >
                <option value="overview" className="bg-gray-800">Overview</option>
                <option value="full-resume" className="bg-gray-800">Full Resume</option>
                {resumeData.sections.map(section => (
                  <option key={section.id} value={section.id} className="bg-gray-800">
                    {section.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === "overview" && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20"
                >
                  <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-start w-full`}>
                    <div className={`${isMobile ? 'mb-4 flex justify-center w-full' : 'mr-6'}`}>
                      <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-5xl overflow-hidden border-2 border-white border-opacity-30">
                        <img src="/assets/Mo.png" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <motion.h1 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-2">{resumeData.overview.name}</motion.h1>
                      <motion.h2 variants={itemVariants} className="text-lg md:text-xl text-blue-300 mb-4">{resumeData.overview.title}</motion.h2>
                      <motion.p variants={itemVariants} className="text-gray-200 mb-6">{resumeData.overview.summary}</motion.p>
                      
                      <motion.div variants={itemVariants} className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-4'} w-full`}>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">📍</span>
                          <span className="text-gray-200">{resumeData.overview.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">📧</span>
                          <span className="text-gray-200">{resumeData.overview.contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">📱</span>
                          <span className="text-gray-200">{resumeData.overview.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">🔗</span>
                          <span className="text-gray-200">{resumeData.overview.contact.linkedin}</span>
                        </div>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="mt-6">
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">Key Achievements</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {resumeData.overview.achievements.map((achievement, index) => (
                            <li key={index} className="text-gray-200">{achievement}</li>
                          ))}
                        </ul>
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
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20"
                  >
                    <div className="flex items-center mb-6">
                      <span className="text-3xl mr-3">{section.icon}</span>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>
                    
                    {section.id === "experience" && (
  <div className={`w-full transition-all duration-300 ${getViewMode() === 'grid' && !isMobile ? 'grid grid-cols-2 gap-6' : 'space-y-6'}`}>
    {section.content.filter(exp => {
      if (!searchQuery) return true;
      return (
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }).map((exp, index) => (
      <motion.div 
        key={index} 
        variants={itemVariants}
        className={`bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-10 transition-all cursor-pointer ${expandedExperience === index ? 'shadow-lg bg-opacity-20' : 'hover:shadow-lg hover:bg-opacity-20'}`}
        onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-blue-300">{highlightMatch(exp.title)}</h3>
          <span className="text-gray-300 text-lg">{expandedExperience === index ? '▲' : '▼'}</span>
        </div>
        <div className={`${isMobile ? 'flex flex-col space-y-1' : 'flex justify-between items-center'} mb-2`}>
          <span className="text-gray-200">{highlightMatch(exp.company)}</span>
          <span className="text-gray-300 text-sm">{exp.period}</span>
        </div>
        <AnimatePresence>
          {expandedExperience === index && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-gray-200 mt-2"
            >
              {Array.isArray(exp.description) ? (
                <ul className="list-disc pl-5 space-y-1">
                  {exp.description.map((point, i) =>
                    point.trim() === "Key Achievements:" ? (
                      <li key={i} className="mt-4 mb-1 font-semibold text-blue-300">Key Achievements:</li>
                    ) : point.startsWith("-") ? (
                      <li key={i} className="ml-4">{point.slice(1).trim()}</li>
                    ) : (
                      <li key={i}>{point}</li>
                    )
                  )}
                </ul>
              ) : (
                <span>{highlightMatch(exp.description)}</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ))}
  </div>
)}
    {section.id === "education" && (
      <div className={`w-full transition-all duration-300 ${getViewMode() === 'grid' && !isMobile ? 'grid grid-cols-2 gap-6' : 'space-y-6'}`}>
        {section.content.filter(edu => {
          if (!searchQuery) return true;
          return (
            edu.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
            edu.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
            edu.details.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }).map((edu, index) => (
          <motion.div key={index} variants={itemVariants} className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-10 hover:shadow-lg hover:bg-opacity-20 transition-all">
            <h3 className="text-xl font-semibold text-blue-300">{highlightMatch(edu.degree)}</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-200">{highlightMatch(edu.institution)}</span>
              <span className="text-gray-300 text-sm">{edu.year}</span>
            </div>
            <p className="text-gray-200">{highlightMatch(edu.details)}</p>
          </motion.div>
        ))}
      </div>
    )}

                    
                    {section.id === "skills" && (
  <div className={`w-full transition-all duration-300 ${getViewMode() === 'grid' && !isMobile ? 'grid grid-cols-2 gap-6' : 'space-y-6'}`}>
    {section.content.filter(skillGroup => {
      if (!searchQuery) return true;
      return (
        skillGroup.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skillGroup.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }).map((skillGroup, index) => (
      <motion.div key={index} variants={itemVariants} className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-10 hover:shadow-lg hover:bg-opacity-20 transition-all">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">{highlightMatch(skillGroup.category)}</h3>
        <ul className="flex flex-wrap gap-2">
          {skillGroup.skills.filter(skill => {
            if (!searchQuery) return true;
            return skill.toLowerCase().includes(searchQuery.toLowerCase()) || skillGroup.category.toLowerCase().includes(searchQuery.toLowerCase());
          }).map((skill, i) => (
            <li key={i} className="bg-blue-400/20 text-blue-200 px-2 py-1 rounded text-sm font-mono">
              {highlightMatch(skill)}
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
)}
                    
                    {section.id === "projects" && (
  <div className={`w-full transition-all duration-300 ${getViewMode() === 'grid' && !isMobile ? 'grid grid-cols-2 gap-6' : 'space-y-6'}`}>
    {section.content.filter(project => {
      if (!searchQuery) return true;
      return (
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }).map((project, index) => (
      <motion.div key={index} variants={itemVariants} className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-10 hover:shadow-lg hover:bg-opacity-20 transition-all">
        <h3 className="text-xl font-semibold text-blue-300">{highlightMatch(project.name)}</h3>
        <p className="text-gray-200 mb-2">{highlightMatch(project.description)}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.filter(tech => {
            if (!searchQuery) return true;
            return tech.toLowerCase().includes(searchQuery.toLowerCase()) || project.name.toLowerCase().includes(searchQuery.toLowerCase());
          }).map((tech, i) => (
            <span key={i} className="bg-blue-400/20 text-blue-200 px-2 py-1 rounded text-xs font-mono">
              {highlightMatch(tech)}
            </span>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
)}
                    
                    {section.id === "certifications" && (
                      <div className="space-y-4 w-full">
                        {section.content.map((cert, index) => (
                          <motion.div key={index} variants={itemVariants} className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-10 flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-semibold text-blue-300">{highlightMatch(cert.name)}</h3>
                              <p className="text-gray-200">{highlightMatch(cert.issuer)}</p>
                            </div>
                            <span className="text-gray-300">{cert.year}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {section.id === "languages" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                        {section.content.map((lang, index) => (
                          <motion.div key={index} variants={itemVariants} className="bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-10">
                            <h3 className="text-lg font-semibold text-blue-300">{lang.language}</h3>
                            <p className="text-gray-200">{lang.proficiency}</p>
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
                  className="h-full flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20"
                >
                  <motion.div variants={itemVariants} className="text-center mb-8 w-full">
                    <span className="text-5xl mb-4 block">📄</span>
                    <h2 className="text-2xl font-bold mb-2">Full Resume</h2>
                    <p className="text-gray-300 mb-6">View or download the complete resume</p>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <a 
                      href="/assets/Resume_Mohammed_Atif_Ali_Neranki.pdf" 
                      target="_blank"
                      className="px-6 py-3 bg-blue-600 bg-opacity-70 text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2 shadow-lg border border-blue-400 border-opacity-30"
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
                      className="px-6 py-3 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 transition-colors flex items-center space-x-2 shadow-lg border border-white border-opacity-20"
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
