import GameCard from "../components/game-card/game-card";
import gamesData from "../data/games.json";
import Banner from "../components/banner-heading/banner-heading";
import WeeklyCalendar from "../components/calendar/calendar";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "../lib/dayjs";

function HomePage() {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Initializing with the current date
  const [todayGames, setTodayGames] = useState([]);

  useEffect(() => {
    if (currentDate) {
      const formattedDate = currentDate.format("ll");
      const matchesFiltered = gamesData.response.filter(
        (game) => dayjs(game.date.start).format("ll") === formattedDate
      );
      setTodayGames(matchesFiltered);
    }
  }, [currentDate]);

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-32">
      {/* Banner */}
      <Banner />

      {/* Weekly Calendar */}
      <WeeklyCalendar onDayClick={(selectedDay) => setCurrentDate(selectedDay)} />

      {/* Date selected */}
      <div className="text-center text-xl font-bold my-4">
        {currentDate && currentDate.format("MMMM D, YYYY")}
      </div>

      {/* Match Grid */}
      <div className="container mx-auto pt-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 max-w-screen-lg">
        {todayGames.length > 0 ? (
          todayGames.map((game) => (
            <Link
              className="w-full mx-auto transform hover:scale-105 transition-transform duration-300"
              key={game.id}
              to={`/game/${game.id}`}
            >
              <GameCard key={game.id} game={game} />
            </Link>
          ))
        ) : (
          <h1 className="text-4xl font-bold">No games found</h1>
        )}
      </div>
    </div>
  );
}

export default HomePage;