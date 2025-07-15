import { useState, useRef, useEffect } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import { useDevice } from '../../contexts/DeviceContext';

const Terminal = () => {
  const { currentProfile } = useProfile();
  const { isMobile } = useDevice();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to AtifOS Terminal! Type "help" for available commands.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle command submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user input to history
    setHistory(prev => [...prev, { type: 'user', content: input }]);
    
    // Process command
    const command = input.trim().toLowerCase();
    setInput('');
    setIsLoading(true);

    try {
      // Handle built-in commands
      if (command === 'help') {
        setHistory(prev => [...prev, { 
          type: 'system', 
          content: `Available commands:
          - help: Show this help message
          - clear: Clear terminal
          - show projects: Display my projects
          - export resume: Download my resume as PDF
          - summon mini-me: Show the Mini-Me assistant
          - about: About AtifOS
          
          You can also ask me any questions about my experience, skills, or background!`
        }]);
      } else if (command === 'clear') {
        setHistory([{ type: 'system', content: 'Terminal cleared.' }]);
      } else if (command === 'about') {
        setHistory(prev => [...prev, { 
          type: 'system', 
          content: 'AtifOS v1.0 - An interactive OS-style personal resume built with React and powered by OpenAI.'
        }]);
      } else {
        // Process with OpenAI API
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: input,
              profile: currentProfile
            }),
          });

          const data = await response.json();
          
          if (data.error) {
            throw new Error(data.error);
          }

          setHistory(prev => [...prev, { type: 'ai', content: data.reply }]);
        } catch (error) {
          console.error('Error processing command:', error);
          setHistory(prev => [...prev, { 
            type: 'error', 
            content: `Error: ${error.message || 'Failed to process command'}`
          }]);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`flex flex-col ${isMobile ? 'h-full' : 'h-96'} bg-black bg-opacity-80 text-green-400 font-mono rounded-lg overflow-hidden`}
      onClick={focusInput}
    >
      {/* Terminal output */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto"
      >
        {history.map((entry, index) => (
          <div key={index} className={`mb-2 ${entry.type === 'error' ? 'text-red-500' : ''}`}>
            {entry.type === 'user' ? (
              <div>
                <span className="text-blue-400">guest@atifos:~$</span> {entry.content}
              </div>
            ) : (
              <div>{entry.content}</div>
            )}
          </div>
        ))}
        {isLoading && <div className="animate-pulse">Processing...</div>}
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-700 p-2 flex">
        <span className="text-blue-400 mr-2">guest@atifos:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none"
          placeholder="Type a command..."
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
