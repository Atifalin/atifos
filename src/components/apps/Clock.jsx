import { useState, useEffect } from 'react';

const Clock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const formattedDate = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-64 bg-white bg-opacity-10 backdrop-blur rounded-xl shadow-lg border border-white border-opacity-20 p-4 flex flex-col items-center">
        <div className="text-5xl font-mono text-blue-200 mb-2">{formattedTime}</div>
        <div className="text-lg text-white mb-4">{formattedDate}</div>
        <div className="w-32 h-32 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" stroke="#60a5fa" strokeWidth="3" fill="none" />
            <line x1="50" y1="50" x2={50 + 35 * Math.sin((now.getSeconds() / 60) * 2 * Math.PI)} y2={50 - 35 * Math.cos((now.getSeconds() / 60) * 2 * Math.PI)} stroke="#3b82f6" strokeWidth="2" />
            <line x1="50" y1="50" x2={50 + 30 * Math.sin(((now.getMinutes() + now.getSeconds()/60) / 60) * 2 * Math.PI)} y2={50 - 30 * Math.cos(((now.getMinutes() + now.getSeconds()/60) / 60) * 2 * Math.PI)} stroke="#2563eb" strokeWidth="4" />
            <line x1="50" y1="50" x2={50 + 25 * Math.sin(((now.getHours()%12 + now.getMinutes()/60) / 12) * 2 * Math.PI)} y2={50 - 25 * Math.cos(((now.getHours()%12 + now.getMinutes()/60) / 12) * 2 * Math.PI)} stroke="#1e293b" strokeWidth="5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Clock;
