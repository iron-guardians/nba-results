import { useParams } from "react-router-dom";
import GameHeading from "../components/game-heading/game-heading";
import gamesData from "../data/games.json";
import standings from "../data/standings.json";
import QuartersTable from "../components/quarters-table/quarters-table";
import StatComparer from "../components/stat-comparer/stat-comparer";
import gameStats from "../data/game-stat-example.json";

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

  // Si gameData no existe, mostramos un mensaje de error
  if (!gameData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-red-500">
        <h1 className="text-4xl font-bold">Game not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Contenedor Principal */}
      <div className="container mx-auto pt-32 pb-12 px-4">
        {/* Encabezado del Juego */}
        <div className="mb-10">
          <GameHeading
            game={gameData}
            teams={[homeTeamStanding, visitorTeamStanding]}
          />
        </div>

        {/* Tabla de Cuartos */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
            Resumen por Cuartos
          </h2>
          <QuartersTable
            game={gameData}
            teams={[homeTeamStanding, visitorTeamStanding]}
          />
        </div>

        {/* Comparación de Estadísticas */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
            Comparativa de Estadísticas
          </h2>
          <StatComparer
            stat={{
              statName: "Field Goals",
              isPercentage: true,
              visitorTeam: visitorTeamStanding.team,
              visitorsMade: visitorStats.fgm,
              visitorsAttempted: visitorStats.fga,
              homeTeam: homeTeamStanding.team,
              homeMade: homeStats.fgm,
              homeAttempted: homeStats.fga,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
