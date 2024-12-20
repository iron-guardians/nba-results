import React, { useState } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday); // Activates the 'isToday' plugin inside of dayjs

const WeeklyCalendar = ({ onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showMonthlyCalendar, setShowMonthlyCalendar] = useState(false);

  const startOfWeek = currentDate.startOf("week");

  const changeWeek = (interval) => {
    setCurrentDate(currentDate.add(interval, "week"));
  };

  const renderDaysOfWeek = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, "day");
      days.push(
        <div
          key={i}
          className={`flex flex-col items-center px-2 py-2 cursor-pointer ${
            day.isSame(selectedDate, "day")
              ? "font-extrabold text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => {
            setSelectedDate(day);
            onDayClick?.(day); // ? Ensures that the code doesn't throw an error in case onDayClick isn't defined
          }}
        >
          <span className="uppercase text-sm">{day.format("ddd")}</span>
          <span className="text-s">{day.format("MMM D")}</span>
        </div>
      );
    }
    return days;
  };

  const renderMonthlyCalendar = () => {
    // Get the first day of the current month
    const startOfMonth = currentDate.startOf("month");
    // Create an array with the number of days in the month
    const daysInMonth = Array.from({ length: currentDate.daysInMonth() });

    // Return the main container for the monthly calendar
    return (
      <div
        // Calendar container with absolute positioning
        className="absolute top-28 right-5 bg-white shadow-lg rounded-lg p-6"
        style={{ width: "400px" }} // Fixed width for the calendar
      >
        {/* Header section for navigation and current month display */}
        <div className="flex justify-between items-center mb-4">
          {/* Button to go to the previous month */}
          <button
            onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
            className="text-blue-500 text-lg font-bold"
          >
            &#8249;
          </button>
          {/* Display the current month and year */}
          <span
            className="text-lg text-black font-semibold text-center"
            style={{ flexGrow: 1 }} // Allows the text to occupy the remaining space
          >
            {currentDate.format("MMMM YYYY")}{" "}
            {/* Month and year in the center */}
          </span>{" "}
          {/* Button to go to the next month */}
          <button
            onClick={() => setCurrentDate(currentDate.add(1, "month"))}
            className="text-blue-500 text-lg font-bold"
          >
            &#8250;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={index} className="text-center font-bold text-gray-500">
              {day} {/* Display the day name */}
            </div>
          ))}
          {/* Render empty cells for days before the start of the month */}
          {[...Array(startOfMonth.day()).keys()].map((_, i) => (
            <div key={`empty-${i}`} /> // Empty cells for alignment
          ))}
          {/* Render the actual days of the month */}
          {daysInMonth.map((_, i) => {
            // Get the current day by adding the index to the start of the month
            const day = startOfMonth.add(i, "day");
            return (
              <div
                key={i}
                className={`text-center cursor-pointer p-3 rounded-lg ${
                  day.isSame(selectedDate, "day")
                    ? "bg-blue-500 text-white font-bold"
                    : "text-black"
                }`}
                onClick={() => {
                  setSelectedDate(day);
                  setShowMonthlyCalendar(false);
                  onDayClick?.(day);
                }}
              >
                {day.date()} {/* Display the day number */}
              </div>
            );
          })}
        </div>

        {/* Footer section with buttons for Today and Cancel */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
                const today = dayjs(); 
                setSelectedDate(today); 
                setCurrentDate(today);
            }}
            className="text-blue-500 text-sm font-bold"
          >
            TODAY
          </button>
          <button
            onClick={() => setShowMonthlyCalendar(false)}
            className="text-blue-500 text-sm font-bold"
          >
            CANCEL
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
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

        {/* Calendar Icon */}
        <button
          onClick={() => setShowMonthlyCalendar(!showMonthlyCalendar)}
          className="text-blue-500 text-xl font-bold hover:text-blue-700 ml-4"
        >
          <img
            src="/images/calendar.png"
            alt="Calendar"
            style={{ width: "68px", height: "52px" }}
          />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => changeWeek(1)}
          className="text-blue-500 text-xl font-bold hover:text-blue-700"
        >
          &#8250;
        </button>
      </div>

      {/* Monthly Calendar */}
      {showMonthlyCalendar && renderMonthlyCalendar()}
    </div>
  );
};

export default WeeklyCalendar;
