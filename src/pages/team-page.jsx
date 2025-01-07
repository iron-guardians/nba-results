import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamsData from "../data/teams-data.json";
import standings from "../data/standings.json";
import gamesData from "../data/games.json";
import GameCard from "../components/game-card/game-card";

function TeamPage() {
  const { teamId } = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const [teamStanding, setTeamStanding] = useState(null);
  const [playedGames, setPlayedGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [selectedTab, setSelectedTab] = useState("played");

  useEffect(() => {
    const team = teamsData.find((team) => team.id === parseInt(teamId, 10));
    setTeamInfo(team);

    const standing = standings.response.find(
      (standing) => standing.team.id === parseInt(teamId, 10)
    );
    setTeamStanding(standing);

    const currentDate = new Date();

    const played = gamesData.response.filter(
      (game) =>
        (game.teams.home.id === parseInt(teamId, 10) ||
          game.teams.visitors.id === parseInt(teamId, 10)) &&
        new Date(game.date.start) < currentDate &&
        game.status.short === 3
    );

    const upcoming = gamesData.response.filter(
      (game) =>
        (game.teams.home.id === parseInt(teamId, 10) ||
          game.teams.visitors.id === parseInt(teamId, 10)) &&
        new Date(game.date.start) >= currentDate &&
        game.status.short !== 3
    );

    setPlayedGames(played);
    setUpcomingGames(upcoming);
  }, [teamId]);

  if (!teamInfo || !teamStanding) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold text-red-500">Team not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-40">
      <div className="container mx-auto pt-6 pb-12">
  {/* Información Principal */}
  <div className="flex flex-col md:flex-row items-center md:items-start mb-10 bg-gray-800 p-6 rounded-lg shadow-lg">
    {/* Logo del Equipo */}
    <img
      src={teamInfo.logo}
      alt={`${teamInfo.name} Logo`}
      className="w-32 h-32 object-contain mb-6 md:mb-0 md:mr-6"
    />

    {/* Contenido de Información */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-center md:text-left w-full">
      {/* Columna 1: Información Básica */}
      <div>
        <h1 className="text-4xl font-bold text-blue-400">{teamInfo.name}</h1>
        <p className="text-gray-400 mt-2">
          <span className="font-semibold text-orange-400">City:</span> {teamInfo.city}
        </p>
        <p className="text-gray-400">
          <span className="font-semibold text-orange-400">Abbreviation:</span> {teamInfo.code}
        </p>
      </div>

      {/* Columna 2: Detalles Adicionales */}
      <div>
        <p className="text-gray-400">
          <span className="font-semibold text-orange-400">Conference:</span>{" "}
          {teamStanding.conference.name}
        </p>
        <p className="text-gray-400">
          <span className="font-semibold text-orange-400">Division:</span> {teamStanding.division.name}
        </p>
        <p className="text-gray-400">
          <span className="font-semibold text-orange-400">Wins:</span> {teamStanding.win.total}{" "}
          <span className="font-semibold text-orange-400">Losses:</span> {teamStanding.loss.total}
        </p>
        <p className="text-gray-400">
          <span className="font-semibold text-orange-400">Overall Ranking:</span>{" "}
          #{teamStanding.position}
        </p>
      </div>
    </div>
  </div>



        {/* Tabs para Jugados y Próximos Partidos */}
        <div className="flex justify-center space-x-4 mb-10">
          <button
            onClick={() => setSelectedTab("played")}
            className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              selectedTab === "played" ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            Played Games
          </button>
          <button
            onClick={() => setSelectedTab("upcoming")}
            className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              selectedTab === "upcoming" ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            Upcoming Games
          </button>
        </div>

        {/* Contenido de las Tabs */}
        {selectedTab === "played" && (
          <>
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
              Played Games
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
              {playedGames.length > 0 ? (
                playedGames.map((game) => (
                  <GameCard key={game.id} game={game} standings={standings.response} />
                ))
              ) : (
                <p className="text-center text-gray-400">No games played yet.</p>
              )}
            </div>
          </>
        )}

        {selectedTab === "upcoming" && (
          <>
            <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
              Upcoming Games
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
              {upcomingGames.length > 0 ? (
                upcomingGames.map((game) => (
                  <GameCard key={game.id} game={game} standings={standings.response} />
                ))
              ) : (
                <p className="text-center text-gray-400">No upcoming games scheduled.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TeamPage;


