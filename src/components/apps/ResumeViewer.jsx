import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ResumeViewer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [pdfUrl] = useState('/assets/Resume_Mohammed_Atif_Ali_Neranki.pdf');
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    // Check if PDF exists by making a HEAD request
    fetch(pdfUrl, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          setPdfError(true);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setPdfError(true);
        setIsLoading(false);
      });
  }, [pdfUrl]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setPdfError(true);
    setIsLoading(false);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const resetZoom = () => {
    setScale(1);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-gray-800 p-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 rounded hover:bg-gray-700 text-gray-300"
            onClick={zoomOut}
            title="Zoom Out"
            disabled={pdfError}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          
          <span className="text-gray-300 text-sm">{Math.round(scale * 100)}%</span>
          
          <button 
            className="p-1 rounded hover:bg-gray-700 text-gray-300"
            onClick={zoomIn}
            title="Zoom In"
            disabled={pdfError}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            className="p-1 rounded hover:bg-gray-700 text-gray-300"
            onClick={resetZoom}
            title="Reset Zoom"
            disabled={pdfError}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div>
          <a 
            href={pdfUrl} 
            download="Resume_Mohammed_Atif_Ali_Neranki.pdf"
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download
          </a>
        </div>
      </div>
      
      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-900 flex items-center justify-center">
        {isLoading && !pdfError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {pdfError ? (
          <div className="text-center p-8">
            <div className="text-red-500 text-5xl mb-4">📄❌</div>
            <h3 className="text-xl font-semibold text-white mb-2">Resume PDF Not Found</h3>
            <p className="text-gray-400 mb-4">The resume PDF file could not be loaded.</p>
            <p className="text-gray-500 text-sm">Please make sure the file exists at: {pdfUrl}</p>
          </div>
        ) : (
          <motion.div 
            className="p-4"
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'center top'
            }}
          >
            <object 
              data={pdfUrl} 
              type="application/pdf"
              className="w-[800px] h-[1100px] border-none bg-white"
              onLoad={handleLoad}
              onError={handleError}
            >
              <div className="w-[800px] h-[1100px] flex items-center justify-center bg-white text-center p-8">
                <div>
                  <p className="text-gray-800 mb-4">Unable to display PDF file.</p>
                  <a 
                    href={pdfUrl} 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Download PDF Instead
                  </a>
                </div>
              </div>
            </object>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeViewer;
