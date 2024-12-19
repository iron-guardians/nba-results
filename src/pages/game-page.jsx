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
        <div className="flex flex-col items-center pt-32 gap-12">
            <GameHeading game={gameData} teams={[homeTeamStanding, visitorTeamStanding]} />
            <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
              Resumen por Cuartos
            </h2>
            <QuartersTable
              game={gameData}
              teams={[homeTeamStanding, visitorTeamStanding]}
            />

            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 max-w-screen-lg">
                <StatComparer stat={
                    {
                        statName: "Field Goals",
                        isPercentage: true,
                        visitorsTeam: visitorTeamStanding.team,
                        visitorsMade: visitorStats.fgm,
                        visitorsAttempted: visitorStats.fga,
                        homeTeam: homeTeamStanding.team,
                        homeMade: homeStats.fgm,
                        homeAttempted: homeStats.fga
                    }}/>

                <StatComparer stat={
                    {
                        statName: "3 Pointers",
                        isPercentage: true,
                        visitorsTeam: visitorTeamStanding.team,
                        visitorsMade: visitorStats.tpm,
                        visitorsAttempted: visitorStats.tpa,
                        homeTeam: homeTeamStanding.team,
                        homeMade: homeStats.tpm,
                        homeAttempted: homeStats.tpa
                    }}/>    

                <StatComparer stat={
                    {
                        statName: "Total Rebounds",
                        isPercentage: false,
                        visitorsTeam: visitorTeamStanding.team,
                        visitorsMade: visitorStats.totReb,
                        homeTeam: homeTeamStanding.team,
                        homeMade: homeStats.totReb,
                        homeAttempted: homeStats.fga
                    }}/>

                <StatComparer stat={
                    {
                        statName: "Assists",
                        isPercentage: false,
                        visitorsTeam: visitorTeamStanding.team,
                        visitorsMade: visitorStats.assists,
                        homeTeam: homeTeamStanding.team,
                        homeMade: homeStats.assists,
                    }}/>
            </div>
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
