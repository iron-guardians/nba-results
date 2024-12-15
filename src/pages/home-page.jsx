import React, {useEffect, useState} from "react";
import GameCard from "../components/game-card/game-card"
import gamesData from '../data/games.json';

function HomePage() {
    return (
        <div className="pt-32">
            {gamesData.response.map((game) => (
                <GameCard key={game.id} game={game}/>
            ))}
        </div>
        
    )
}

export default HomePage;