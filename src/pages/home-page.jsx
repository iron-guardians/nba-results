import GameCard from "../components/game-card/game-card"
import gamesData from '../data/games.json';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="pt-32 mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 max-w-screen-lg">
            {gamesData.response.map((game) => (
                <Link className="w-full mx-auto transform hover:scale-105 transition-transform duration-300" 
                      key={game.id} 
                      to={`/game/${game.id}`}>
                    <GameCard key={game.id} game={game}/>
                </Link>         
            ))}
        </div>       
    )
}

export default HomePage;