import GameCardContainer from "../components/game-card-container/game-card-container";
import Banner from "../components/banner-heading/banner-heading";
import WeeklyCalendar from "../components/calendar/calendar";
import GameCard from "../components/game-card/game-card";

import * as DunkNationApi from "../services/api-service.js";

import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import dayjs from "../lib/dayjs";

function HomePage() {
  const { date } = useParams();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(
    date ? dayjs(date, "ddd") : dayjs()
  ); // Initializing with the current date

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
    if (date) {
      const parsedDate = dayjs(date, "ddd");
      if (parsedDate.isValid()) {
        setCurrentDate(parsedDate); 
      }}
  }, [date])

  useEffect(() => {
    if (gamesData.length > 0) {
      const formattedDate = currentDate.format("ll");

      const matchesFiltered = gamesData.filter(
        (game) => dayjs(game.date.start).format("ll") === formattedDate
      );
      setTodayGames(matchesFiltered);
    }
  }, [gamesData, currentDate]);

  function setNewDate(selectedDay)
  {
    //setCurrentDate(selectedDay);
    navigate(`/${(dayjs(selectedDay).add(1, 'day')).toISOString().split("T")[0]}`, { replace: true });
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Banner */}
      <Banner />

      {/* Weekly Calendar */}
      <WeeklyCalendar date={date} onDayClick={(selectedDay) => setNewDate(selectedDay)} />

      {/* Match Grid */}
      <GameCardContainer 
        className="bg-gray-900"
        matchDate={currentDate.format("MMMM DD, YYYY")} // Pass the date to the GameCardContainer 
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