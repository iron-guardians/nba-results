import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamsData from "../data/teams-data.json";
import standings from "../data/standings.json";
import gameStats from "../data/game-stat-example.json";
import gamesData from "../data/games.json";
import GameCard from "../components/game-card/game-card";

function TeamPage() {
  const { teamId } = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const [teamStats, setTeamStats] = useState([]);
  const [teamGames, setTeamGames] = useState([]);

  useEffect(() => {
    const team = teamsData.find((team) => team.id === parseInt(teamId, 10));
    setTeamInfo(team);

    const stats = gameStats.response.filter(
      (stat) => stat.team.id === parseInt(teamId, 10)
    );
    setTeamStats(stats);

    const games = gamesData.response.filter(
      (game) =>
        game.teams.home.id === parseInt(teamId, 10) ||
        game.teams.visitors.id === parseInt(teamId, 10)
    );
    setTeamGames(games);
  }, [teamId]);

  if (!teamInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold text-red-500">Team not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-40">
      <div className="container mx-auto pt-6 pb-12">
        {/* Principal information */}
        <div className="flex items-center mb-10">
          <img
            src={teamInfo.logo}
            alt={`${teamInfo.name} Logo`}
            className="w-32 h-32 object-contain mr-6"
          />
          <div>
            <h1 className="text-4xl font-bold text-blue-400">{teamInfo.name}</h1>
            <p className="text-gray-400">City: {teamInfo.city}</p>
            <p className="text-gray-400">Abbreviation: {teamInfo.code}</p>
          </div>
        </div>

        {/* Classification */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-400 mb-4">Standings</h2>
          <ul className="bg-gray-800 p-4 rounded-lg shadow-md">
            {standings.response
              .filter((standing) => standing.team.id === teamInfo.id)
              .map((standing) => (
                <li key={standing.team.id} className="mb-2 text-gray-300">
                  <p>
                    <span className="text-orange-400">Rank:</span> {standing.position}
                  </p>
                  <p>
                    <span className="text-orange-400">Wins:</span> {standing.win.total} -{" "}
                    <span className="text-orange-400">Losses:</span> {standing.loss.total}
                  </p>
                </li>
              ))}
          </ul>
        </div>

        {/* Team Stats */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-400 mb-4">Team Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamStats.map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-2">{stat.statType}</h3>
                <p className="text-gray-300">
                  <span className="text-blue-400">Value:</span> {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Matches played */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-400 mb-4">All Team Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            {teamGames.length > 0 ? (
              teamGames.map((game) => (
                <GameCard 
                  key={game.id}
                  game={game}
                  standings={standings.response}
                />
              ))
            ) : (
              <p className="text-gray-400">No games available for this team.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
