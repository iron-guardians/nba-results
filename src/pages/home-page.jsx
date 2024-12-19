import GameCard from "../components/game-card/game-card";
import gamesData from "../data/games.json";
import { Link } from "react-router-dom";
import Banner from "../components/banner-heading/banner-heading";
import { useState, useEffect } from "react";
import dayjs from "../lib/dayjs";

function HomePage() {
  const [currentDate, setCurrentDate] = useState();
  const [todayGames, setTodayGames] = useState([]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() - 5);

    setCurrentDate(dayjs(tomorrow).format('ll'));

    setTodayGames(gamesData.response.filter((game) => dayjs(game.date.start).format('ll') === dayjs(tomorrow).format('ll')));
  }, []);


  return (
    <div className="bg-gray-900 text-white min-h-screen pt-32">
      {/* Banner */}
      <Banner />

      { currentDate}
      {/* Match Grid */}
      <div className="container mx-auto pt-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 max-w-screen-lg">
        {todayGames.length > 0 ?
        todayGames
        .map((game) => (
          <Link
            className="w-full mx-auto transform hover:scale-105 transition-transform duration-300"
            key={game.id}
            to={`/game/${game.id}`}
          >
            <GameCard key={game.id} game={game} />
          </Link>
        ))
        :
        <h1 className="text-4xl font-bold">No games found</h1>
        }
      </div>
    </div>
  );
}

export default HomePage;

