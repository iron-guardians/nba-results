import React, { useState } from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);  // Activates the 'isToday' plugin inside of dayjs

const WeeklyCalendar = ({ onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const startOfWeek = currentDate.startOf('week');

  const changeWeek = (interval) => {
    setCurrentDate(currentDate.add(interval, 'week'));
  };

  const renderDaysOfWeek = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, 'day');
      days.push(
        <div
          key={i}
          className={`flex flex-col items-center px-2 py-2 cursor-pointer ${
            day.isSame(selectedDate, 'day') ? 'font-extrabold text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => {
            setSelectedDate(day);
            onDayClick?.(day);  // ? Ensures that the code doesn't throw an error in case onDayClick isn't defined
          }}
        >
          <span className="uppercase text-sm">{day.format('ddd')}</span>
          <span className="text-s">{day.format('MMM D')}</span>
        </div>
      );
    }
    return days;
  };


  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
      {/* Left Arrow */}
      <button
        onClick={() => changeWeek(-1)}
        className="text-blue-500 text-xl font-bold hover:text-blue-700"
      >
        &#8249;
      </button>

      {/* Days of the Week */}
      <div className="flex justify-around flex-1 space-x-4 font-bold ">
        {renderDaysOfWeek()}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => changeWeek(1)}
        className="text-blue-500 text-xl font-bold hover:text-blue-700"
      >
        &#8250;
      </button>
    </div>
  );
};

export default WeeklyCalendar;