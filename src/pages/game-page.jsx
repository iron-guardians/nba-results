import { Link, useParams } from "react-router-dom";
import GameHeading from "../components/game-heading/game-heading";
import QuartersTable from "../components/quarters-table/quarters-table";
import StatComparer from "../components/stat-comparer/stat-comparer";
import gameStats from "../data/game-stat-example.json";
import teamsData from "../data/teams-data.json";
import GameCard from "../components/game-card/game-card";
import StatComparerContainer from "../components/stat-comparer-container/stat-comparer-container";
import { useEffect, useState } from "react";

import * as DunkNationApi from "../services/api-service";

function GamePage() {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState();
  const [standings, setStandings] = useState();
  const [gameStats, setGameStats] = useState();
  const [previousGames, setPreviousGames] = useState([]);


  useEffect(() => {
    window.scrollTo(0, 0);

    Promise.all([DunkNationApi.getAllGames(), DunkNationApi.getStandings(), DunkNationApi.getGameById(gameId), DunkNationApi.getGameStats(gameId)])
      .then(([gamesResponse, standingsResponse, currentGameResponse, gameStatsResponse]) => {
        setGameData(currentGameResponse[0]);
        setStandings(standingsResponse);
        setGameStats(gameStatsResponse);
        console.log(gameStatsResponse);

        // If the game is not played, fetch previous games
        if (currentGameResponse.length > 0 && currentGameResponse[0].status.short !== 3) {
            const filteredGames = gamesResponse.filter((previousGame) => {
            const currentDate = new Date();
            const gameDate = new Date(previousGame?.date?.start || "");
            const beforeToday = gameDate < currentDate && !isNaN(gameDate);

            const sameTeams =
              (previousGame.teams.home.id === currentGameResponse[0].teams.home.id &&
                previousGame.teams.visitors.id === currentGameResponse[0].teams.visitors.id) ||
              (previousGame.teams.home.id === currentGameResponse[0].teams.visitors.id &&
                previousGame.teams.visitors.id === currentGameResponse[0].teams.home.id);

            return beforeToday && sameTeams && previousGame.status.short === 3;
          });

          setPreviousGames(filteredGames);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [gameId]);

  if (!gameData || !standings || !gameStats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-orange-500">
        <h1 className="text-4xl font-bold">Loading game data...</h1>
      </div>
    );
  }

  const isGamePlayed = gameData?.status.short === 3;

  const visitorTeamStanding = standings?.find(
    (standing) => standing.team.id === gameData.teams.visitors.id
  );
  const homeTeamStanding = standings.find(
    (standing) => standing.team.id === gameData.teams.home.id
  );

  let visitorStats;
  let homeStats;

  if(gameStats.length > 0) {
    visitorStats = gameStats[1].statistics[0];
    homeStats = gameStats[0].statistics[0];
  }


  const visitorTeam = teamsData.find((team) => team.id === visitorTeamStanding.team.id);
  const homeTeam = teamsData.find((team) => team.id === homeTeamStanding.team.id);

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen pt-16">
        {/* Principal Container */}
        <div className="container pb-12">
          {/* Game Header */}
          <div className="stat-container rounded-lg shadow-lg mb-10">
            <GameHeading game={gameData} teams={[visitorTeamStanding, homeTeamStanding]} />
          </div>
  
          {/* Quarters Table or Previous Games */}
          <div className="stat-container p-6 rounded-lg shadow-lg mb-10">
            {isGamePlayed ? (
              <div>
                <h2 className="text-3xl font-semibold text-blue-400 mb-10 text-center">
                  Summary by quarters
                </h2>
                <QuartersTable game={gameData} teams={[visitorTeam, homeTeam]} />
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-semibold text-blue-400 mb-10 text-center">
                  Previous Games
                </h2>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 max-w-screen-lg mx-auto shadow-inner"
                  style={{
                    boxShadow:
                      "inset 0 4px 8px rgba(0, 0, 0, 0.7), inset 0 -4px 8px rgba(0, 0, 0, 0.7), 0 6px 15px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {previousGames.length > 0 ? (
                    previousGames.map((game) => (
                      <Link
                        className="w-full mx-auto transform hover:scale-105 transition-transform duration-300"
                        key={game.id}
                        to={`/game/${game.id}`}
                      >
                        <GameCard key={game.id} game={game} currentGameDate={gameData.date.start} standings={standings}/>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No previous games available.</p>
                  )}
                </div>
              </div>
            )}
          </div>
  
          
          {isGamePlayed && <StatComparerContainer className=" w-screen p-6 rounded-lg shadow-lg mb-10">
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
                statName: "Free throws",
                isPercentage: true,
                visitorsTeam: visitorTeam,
                visitorsMade: visitorStats.ftm,
                visitorsAttempted: visitorStats.fta,
                homeTeam: homeTeam,
                homeMade: homeStats.ftm,
                homeAttempted: homeStats.fta,
              }}
            />

            <StatComparer
              stat={{
                statName: "Rebounds",
                isPercentage: false,
                visitorsTeam: visitorTeam,
                visitorsMade: visitorStats.totReb,
                homeTeam: homeTeam,
                homeMade: homeStats.totReb,
              }}
            />

            <StatComparer
              stat={{
                statName: "Offensive rebounds",
                isPercentage: false,
                visitorsTeam: visitorTeam,
                visitorsMade: visitorStats.offReb,
                homeTeam: homeTeam,
                homeMade: homeStats.offReb,
              }}
            />
            
            <StatComparer
              stat={{
                statName: "Defensive rebounds",
                isPercentage: false,
                visitorsTeam: visitorTeam,
                visitorsMade: visitorStats.defReb,
                homeTeam: homeTeam,
                homeMade: homeStats.defReb,
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

            <StatComparer
              stat={{
                statName: "Steals",
                isPercentage: false,
                visitorsTeam: visitorTeam,
                visitorsMade: visitorStats.steals,
                homeTeam: homeTeam,
                homeMade: homeStats.steals,
              }}
            />

            <StatComparer
              stat={{
                statName: "Blocks",
                isPercentage: false,
                visitorsTeam: visitorTeam,
                visitorsMade: visitorStats.blocks,
                homeTeam: homeTeam,
                homeMade: homeStats.blocks,
              }}
            />

            <StatComparer
              stat={{
                statName: "Turnovers",
                isPercentage: false,
                visitorsTeam: visitorTeam,
                visitorsMade: visitorStats.turnovers,
                homeTeam: homeTeam,
                homeMade: homeStats.turnovers,
              }}
            />

          </StatComparerContainer>}
        </div>
      </div>
    </>
  );
  
}

export default GamePage;