import { useParams } from "react-router-dom";
import GameHeading from "../components/game-heading/game-heading";
import gamesData from "../data/games.json";
import standings from "../data/standings.json";
import QuartersTable from "../components/quarters-table/quarters-table";
import StatComparer from "../components/stat-comparer/stat-comparer";
import gameStats from "../data/game-stat-example.json";
import teamsData from "../data/teams-data.json";

function GamePage() {
  const { gameId } = useParams();

  const gameData = gamesData.response.find((g) => g.id === parseInt(gameId, 10));

  const visitorTeamStanding = standings.response.find(
    (standing) => standing.team.id === gameData.teams.visitors.id
  );
  const homeTeamStanding = standings.response.find(
    (standing) => standing.team.id === gameData.teams.home.id
  );

  const visitorStats = gameStats.response[1].statistics[0];
  const homeStats = gameStats.response[0].statistics[0];

  const visitorTeam = teamsData.find((team) => team.id === visitorTeamStanding.team.id);
  const homeTeam = teamsData.find((team) => team.id === homeTeamStanding.team.id);

  // If gameData does not exist, we show an error message
  if (!gameData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-red-500">
        <h1 className="text-4xl font-bold">Game not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Game Header */}
      <div className="container mx-auto pt-16 px-4">
        <GameHeading game={gameData} teams={[visitorTeamStanding, homeTeamStanding]} />
      </div>

      {/* Quarters table */}
      <div className="container mx-auto mt-12 px-4">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8 text-center">Summary by quarters</h2>
        <QuartersTable game={gameData} teams={[visitorTeam, homeTeam]} />
      </div>

      {/* Stats comparer */}
      <div className="container mx-auto mt-12 px-4">
        <h2 className="text-3xl font-semibold text-blue-400 mb-12 text-center">Stats Comparer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 max-w-screen-lg mx-auto">
          <StatComparer
            stat={{
              statName: "Field Goals",
              isPercentage: true,
              visitorsTeam: visitorTeam,
              visitorsMade: visitorStats.fgm,
              visitorsAttempted: visitorStats.fga,
              homeTeam: homeTeam,
              homeMade: homeStats.fgm,
              homeAttempted: homeStats.fga,
            }}
          />
          <StatComparer
            stat={{
              statName: "3 Pointers",
              isPercentage: true,
              visitorsTeam: visitorTeam,
              visitorsMade: visitorStats.tpm,
              visitorsAttempted: visitorStats.tpa,
              homeTeam: homeTeam,
              homeMade: homeStats.tpm,
              homeAttempted: homeStats.tpa,
            }}
          />
          <StatComparer
            stat={{
              statName: "Total Rebounds",
              isPercentage: false,
              visitorsTeam: visitorTeam,
              visitorsMade: visitorStats.totReb,
              homeTeam: homeTeam,
              homeMade: homeStats.totReb,
            }}
          />
          <StatComparer
            stat={{
              statName: "Assists",
              isPercentage: false,
              visitorsTeam: visitorTeam,
              visitorsMade: visitorStats.assists,
              homeTeam: homeTeam,
              homeMade: homeStats.assists,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GamePage;

