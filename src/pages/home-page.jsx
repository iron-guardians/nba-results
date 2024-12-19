import GameCard from "../components/game-card/game-card";
import gamesData from "../data/games.json";
import { Link } from "react-router-dom";
import Banner from "../components/banner-heading/banner-heading";

function HomePage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-32">
      {/* Banner */}
      <Banner />

      {/* Grid de Partidos */}
      <div className="container mx-auto pt-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 max-w-screen-lg">
        {gamesData.response.map((game) => (
          <Link
            className="w-full mx-auto transform hover:scale-105 transition-transform duration-300"
            key={game.id}
            to={`/game/${game.id}`}
          >
            <GameCard key={game.id} game={game} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

