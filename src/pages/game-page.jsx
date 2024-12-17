import { useParams } from "react-router-dom";
import GameHeading from "../components/game-heading/game-heading";
import gamesData from '../data/games.json';
import standings from '../data/standings.json';
import QuartersTable from "../components/quarters-table/quarters-table";
import StatComparer from "../components/stat-comparer/stat-comparer";
import gameStats from "../data/game-stat-example.json";

function HomePage() {
    const { gameId } = useParams();

    const gameData = gamesData.response.find((g) => g.id === parseInt(gameId, 10));

    const visitorTeamStanding = standings.response.find(standing => standing.team.id === gameData.teams.visitors.id);
    const homeTeamStanding = standings.response.find(standing => standing.team.id === gameData.teams.home.id);

    const visitorStats = gameStats.response[1].statistics[0];
    const homeStats = gameStats.response[0].statistics[0];

    // Si gameData no existe, mostramos un mensaje de error
    if (!gameData) {
        return (
            <div className="flex flex-col items-center pt-32 text-red-500">
                <h1>Game not found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center pt-32">
            <GameHeading game={gameData} teams={[homeTeamStanding, visitorTeamStanding]} />
            <QuartersTable game={gameData} teams={[homeTeamStanding, visitorTeamStanding]} />

            <StatComparer stat={
                {
                    statName: "Field Goals",
                    isPercentage: true,
                    visitorTeam: visitorTeamStanding.team,
                    visitorsMade: visitorStats.fgm,
                    visitorsAttempted: visitorStats.fga,
                    homeTeam: homeTeamStanding.team,
                    homeMade: homeStats.fgm,
                    homeAttempted: homeStats.fga
                }}/>
        </div>
    );
}

export default HomePage;