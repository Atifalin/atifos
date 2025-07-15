import { useState } from 'react';

const getToday = () => {
  const d = new Date();
  return [d.getFullYear(), d.getMonth(), d.getDate()];
};

const Calendar = () => {
  const today = getToday();
  const [current, setCurrent] = useState({ year: today[0], month: today[1] });

  const firstDayOfMonth = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const prevMonth = () => {
    setCurrent((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };
  const nextMonth = () => {
    setCurrent((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-80 bg-white bg-opacity-10 backdrop-blur rounded-xl shadow-lg border border-white border-opacity-20 p-4">
        <div className="flex justify-between items-center mb-2">
          <button className="text-white hover:text-blue-300 px-2" onClick={prevMonth}>&lt;</button>
          <div className="text-white text-lg font-semibold">{monthNames[current.month]} {current.year}</div>
          <button className="text-white hover:text-blue-300 px-2" onClick={nextMonth}>&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1 text-xs text-blue-200">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className="text-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-white">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={i}></div>)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = today[0] === current.year && today[1] === current.month && today[2] === day;
            return (
              <div
                key={day}
                className={`text-center py-1 rounded cursor-pointer transition-all ${isToday ? 'bg-blue-400/40 text-blue-100 font-bold' : 'hover:bg-blue-400/20'}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
