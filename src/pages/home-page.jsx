import GameCard from "../components/game-card/game-card"
import gamesData from '../data/games.json';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="pt-32">
            {gamesData.response.map((game) => (
                <Link key={game.id} to={`/game/${game.id}`}>
                    <GameCard key={game.id} game={game}/>
                </Link>         
            ))}
        </div>       
    )
}

export default HomePage;