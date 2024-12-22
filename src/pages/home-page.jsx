import GameCardContainer from "../components/game-card-container/game-card-container";
import Banner from "../components/banner-heading/banner-heading";
import WeeklyCalendar from "../components/calendar/calendar";
import { Link } from "react-router-dom";
import GameCard from "../components/game-card/game-card";
import * as DunkNationApi from "../services/api-service.js";

import { useState, useEffect, useRef } from "react";
import dayjs from "../lib/dayjs";

function HomePage() {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Initializing with the current date

  const [todayGames, setTodayGames] = useState([]);
  const [gamesData, setGamesData] = useState([]);
  const [standings, setStandings] = useState([]);

  let initialLoad = useRef(true);
  
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;

      DunkNationApi.getAllGames().then((response) => {
        setGamesData(response);      
      });

      DunkNationApi.getStandings().then((response) => {
        setStandings(response);
      });
    }
  }, []);

  useEffect(() => {
    if (gamesData.length > 0) {
      const fotmattedDate = currentDate.format("ll");

      const matchesFiltered = gamesData.filter(
        (game) => dayjs(game.date.start).format("ll") === fotmattedDate
      );
      setTodayGames(matchesFiltered);
    }
  }, [gamesData, currentDate]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Banner */}
      <Banner />

      {/* Weekly Calendar */}
      <WeeklyCalendar onDayClick={(selectedDay) => setCurrentDate(selectedDay)} />

      {/* Match Grid */}
      <GameCardContainer 
        className="bg-gray-900"
        matchDate={currentDate.format("MMMM DD, YYYY")} // Pasar la fecha al GameCardContainer 
        >  
        {todayGames.length > 0 ? (
          todayGames.map((game) => (
            <Link
              className="w-full mx-auto transform hover:scale-105 transition-transform duration-300"
              key={game.id}
              to={`/game/${game.id}`}
            >
              <GameCard key={game.id} game={game} standings={standings}/>
            </Link>
          ))
        ) : (
          <h1 className="text-4xl font-bold">No games found</h1>
        )}
      </GameCardContainer>
    </div>
  );
}

export default HomePage;
