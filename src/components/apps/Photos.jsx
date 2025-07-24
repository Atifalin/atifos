import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../contexts/ProfileContext';
import { useDevice } from '../../contexts/DeviceContext';

const Photos = () => {
  const { currentProfile } = useProfile();
  const { isMobile } = useDevice();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeAlbum, setActiveAlbum] = useState('work');

  // Sample photo data - in a real app, this would come from an API or database
  const photoData = {
    albums: [
      { id: 'work', name: 'Work', icon: '💼' },
      { id: 'projects', name: 'Projects', icon: '🚀' },
      { id: 'travel', name: 'Travel', icon: '✈️' },
      { id: 'hobbies', name: 'Hobbies', icon: '🎨' }
    ],
    photos: {
      work: [
        {
          id: 'work1',
          title: 'Kruger Production Planning',
          description: 'Working on production schedules and inventory optimization',
          url: 'https://images.unsplash.com/photo-1664575198308-3959904fa430',
          date: '2023-04-15'
        },
        {
          id: 'work2',
          title: 'Data Analytics Dashboard',
          description: 'Power BI dashboard for real-time inventory tracking',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          date: '2022-11-22'
        },
        {
          id: 'work3',
          title: 'Team Meeting',
          description: 'Strategic planning session with cross-functional teams',
          url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
          date: '2023-02-08'
        },
        {
          id: 'work4',
          title: 'Supply Chain Optimization',
          description: 'Working on logistics and distribution improvements',
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
          date: '2023-05-30'
        }
      ],
      projects: [
        {
          id: 'project1',
          title: 'AtifOS Development',
          description: 'Building a macOS-inspired personal portfolio',
          url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
          date: '2023-06-12'
        },
        {
          id: 'project2',
          title: 'AI-Driven Analytics',
          description: 'Machine learning model for demand forecasting',
          url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb',
          date: '2022-09-18'
        },
        {
          id: 'project3',
          title: 'ERP Implementation',
          description: 'SAP system customization and deployment',
          url: 'https://images.unsplash.com/photo-1581092921461-eab10380ed66',
          date: '2023-01-25'
        }
      ],
      travel: [
        {
          id: 'travel1',
          title: 'Kamloops, Canada',
          description: 'Beautiful mountain views during MBA studies',
          url: 'https://images.unsplash.com/photo-1609265917433-c3ddb2aaf103',
          date: '2022-05-20'
        },
        {
          id: 'travel2',
          title: 'Bengaluru, India',
          description: 'Home city with vibrant tech culture',
          url: 'https://images.unsplash.com/photo-1580667309332-1706b07f21e9',
          date: '2023-03-10'
        }
      ],
      hobbies: [
        {
          id: 'hobby1',
          title: 'Photography',
          description: 'Landscape photography during weekend hikes',
          url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
          date: '2023-04-02'
        },
        {
          id: 'hobby2',
          title: 'Coding Projects',
          description: 'Working on personal web development projects',
          url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
          date: '2022-12-15'
        },
        {
          id: 'hobby3',
          title: 'Reading',
          description: 'Books on technology and business strategy',
          url: 'https://images.unsplash.com/photo-1513001900722-370f803f498d',
          date: '2023-02-28'
        }
      ]
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Handle photo click
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  // Close photo detail view
  const handleCloseDetail = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="h-full flex flex-col bg-black bg-opacity-70 backdrop-blur-lg text-white">
      {/* Top bar with title and controls */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h1 className="text-2xl font-semibold flex items-center">
          <span className="mr-2">🖼️</span> Photos
        </h1>
        <div className="flex space-x-2">
          {!isMobile && (
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Album selector */}
      <div className="flex overflow-x-auto p-2 border-b border-white/10 hide-scrollbar">
        {photoData.albums.map((album) => (
          <button
            key={album.id}
            className={`flex items-center px-4 py-2 rounded-full mr-2 whitespace-nowrap transition-colors ${
              activeAlbum === album.id
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            onClick={() => setActiveAlbum(album.id)}
          >
            <span className="mr-2">{album.icon}</span>
            {album.name}
          </button>
        ))}
      </div>

      {/* Photo grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAlbum}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className={`grid ${
              isMobile ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-4'
            } gap-4`}
          >
            {photoData.photos[activeAlbum]?.map((photo) => (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handlePhotoClick(photo)}
              >
                <img
                  src={`${photo.url}?auto=format&fit=crop&w=500&q=80`}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h3 className="text-white font-medium text-sm">{photo.title}</h3>
                  <p className="text-white/80 text-xs">{photo.date}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Photo detail view */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex flex-col"
            onClick={handleCloseDetail}
          >
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl font-medium text-white">{selectedPhoto.title}</h2>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={handleCloseDetail}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={`${selectedPhoto.url}?auto=format&fit=max&w=1200&q=90`}
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-4 bg-black/50">
              <p className="text-white/90 mb-1">{selectedPhoto.description}</p>
              <p className="text-white/60 text-sm">{selectedPhoto.date}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photos;
