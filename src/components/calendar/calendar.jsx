import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

const WeeklyCalendar = ({ onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Current date
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Selected date
  const [showMonthlyCalendar, setShowMonthlyCalendar] = useState(false); // Toggle monthly calendar
  const startOfWeek = currentDate.startOf("week"); // Start of the current week
  const calendarRef = useRef(null); // Ref for detecting clicks outside the calendar

  // Detect clicks outside the calendar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowMonthlyCalendar(false); // Close the calendar
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeWeek = (interval) => {
    setCurrentDate(currentDate.add(interval, "week")); // Move to previous/next week
  };

  const renderDaysOfWeek = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, "day"); // Calculate each day of the week
      days.push(
        <div
          key={i}
          className={`flex flex-col items-center px-1 py-2 cursor-pointer ${
            day.isSame(selectedDate, "day")
              ? "font-extrabold text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => {
            setSelectedDate(day); // Set the selected date
            onDayClick?.(day); // Call the callback if provided
          }}
        >
          <span className="uppercase text-sm">{day.format("ddd")}</span> {/* Day name */}
          <span className="text-s">{day.format("MMM D")}</span> {/* Date */}
        </div>
      );
    }
    return days;
  };

  const renderMonthlyCalendar = () => {
    const startOfMonth = currentDate.startOf("month"); // First day of the month
    const daysInMonth = Array.from({ length: currentDate.daysInMonth() }); // Days in the month

    return (
      <div
        ref={calendarRef} // Reference for click detection
        className="absolute top-40 right-5 bg-gray-800 text-white shadow-lg rounded-lg p-6" // Adjusted top to 'top-40'
        style={{ width: "400px" }}
      >
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
            className="text-blue-400 text-lg font-bold hover:text-blue-500 transition duration-300"
          >
            &#8249;
          </button>
          <span className="text-lg font-semibold text-center flex-grow">
            {currentDate.format("MMMM YYYY")} {/* Current month and year */}
          </span>
          <button
            onClick={() => setCurrentDate(currentDate.add(1, "month"))}
            className="text-blue-400 text-lg font-bold hover:text-blue-500 transition duration-300"
          >
            &#8250;
          </button>
        </div>

        {/* Days of the Month */}
        <div className="grid grid-cols-7 gap-2 text-center text-gray-400 font-bold">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={index}>{day}</div> // Day names
          ))}
          {[...Array(startOfMonth.day()).keys()].map((_, i) => (
            <div key={`empty-${i}`} /> // Empty cells for alignment
          ))}
          {daysInMonth.map((_, i) => {
            const day = startOfMonth.add(i, "day");
            return (
              <div
                key={i}
                className={`text-center cursor-pointer p-3 rounded-lg transition duration-300 ${
                  day.isSame(selectedDate, "day")
                    ? "bg-blue-500 text-white font-bold" // Highlight selected day
                    : "hover:bg-gray-700 hover:text-white text-gray-300"
                }`}
                onClick={() => {
                  setSelectedDate(day);
                  setShowMonthlyCalendar(false); // Close the calendar
                  onDayClick?.(day); // Call the callback
                }}
              >
                {day.date()} {/* Day number */}
              </div>
            );
          })}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              const today = dayjs(); // Today's date
              setSelectedDate(today);
              setCurrentDate(today);
            }}
            className="text-blue-400 text-sm font-bold hover:text-blue-500 transition duration-300"
          >
            TODAY
          </button>
          <button
            onClick={() => setShowMonthlyCalendar(false)} // Close the calendar
            className="text-blue-400 text-sm font-bold hover:text-blue-500 transition duration-300"
          >
            CANCEL
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-gray-900 text-white min-h-screen">
      {/* Weekly Calendar */}
      <div className="absolute top-8 left-0 w-full z-10 px-4"> {/* Adjusted top to 'top-14' */}
        <div className="container mx-auto">
          <div className="flex items-center justify-between p-4 bg-gray-800 shadow-md rounded-lg">
            <button
              onClick={() => changeWeek(-1)} // Navigate to previous week
              className="text-blue-400 text-2xl font-bold hover:text-blue-500 transition duration-300"
            >
              &#8249;
            </button>
            <div className="flex justify-around flex-1 space-x-4 font-bold text-white">
              {renderDaysOfWeek()}
            </div>
            <button
              onClick={() => setShowMonthlyCalendar(!showMonthlyCalendar)} // Toggle monthly calendar
              className="ml-4 transition-transform duration-300 transform hover:scale-110"
            >
              <img
                src="/images/calendar.png"
                alt="Calendar"
                className="w-16 h-14 hover:animate-bounce"
              />
            </button>
            <button
              onClick={() => changeWeek(1)} // Navigate to next week
              className="text-blue-400 text-2xl font-bold hover:text-blue-500 transition duration-300"
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Calendar */}
      {showMonthlyCalendar && renderMonthlyCalendar()}
    </div>
  );
};

export default WeeklyCalendar;
