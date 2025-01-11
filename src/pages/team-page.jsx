import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import teamsData from "../data/teams-data.json";
import * as DunkNationApi from "../services/api-service";
import GameCard from "../components/game-card/game-card";
import { firstCharUpperCase } from "../utils.js";

function TeamPage() {
  const { teamId } = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const [teamStanding, setTeamStanding] = useState(null);
  const [standings, setStandings] = useState([]);
  const [playedGames, setPlayedGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [teamStats, setTeamStats] = useState(null);
  const [selectedTab, setSelectedTab] = useState("played");

  useEffect(() => {
    const team = teamsData.find((team) => team.id === parseInt(teamId, 10));
    setTeamInfo(team);

    // Fetch standings
    DunkNationApi.getStandings().then((standings) => {
      setStandings(standings);
      setTeamStanding(standings.find((standing) => standing.team.id === parseInt(teamId, 10)));
    });

    // Fetch games
    const currentDate = new Date();
    DunkNationApi.getAllGames().then((gamesData) => {
      const played = gamesData.filter(
        (game) =>
          (game.teams.home.id === parseInt(teamId, 10) ||
            game.teams.visitors.id === parseInt(teamId, 10)) &&
          new Date(game.date.start) < currentDate &&
          game.status.short === 3
      );

      const upcoming = gamesData.filter(
        (game) =>
          (game.teams.home.id === parseInt(teamId, 10) ||
            game.teams.visitors.id === parseInt(teamId, 10)) &&
          new Date(game.date.start) >= currentDate &&
          game.status.short !== 3
      );

      setPlayedGames(played);
      setUpcomingGames(upcoming);
    });

    // Fetch team stats
    DunkNationApi.getTeamStats(teamId)
      .then((stats) => {
        setTeamStats(stats[0]);
      });
  }, [teamId]);

  if (!teamInfo || standings.length === 0 || !teamStanding) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold text-red-500">Team not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-40">
      <div className="container mx-auto pt-6 pb-12">
        {/* Team Info */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-10 mb-3">
          {/* Team Logo */}
          <div className="flex-shrink-0">
            <img
              src={teamInfo.logo}
              alt={`${teamInfo.name} Logo`}
              className="w-48 h-48"
            />
          </div>

          {/* Team Information */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            {/* Left Section: Team Name and Basic Info */}
            <div>
              <h1 className="text-5xl font-extrabold text-blue-400">{teamInfo.name}</h1>
              <div className="mt-4 space-y-2">
                <p className="text-lg text-gray-300">
                  <span className="font-semibold text-orange-400">City:</span> {teamInfo.city}
                </p>
                <p className="text-lg text-gray-300">
                  <span className="font-semibold text-orange-400">Abbreviation:</span> {teamInfo.code}
                </p>
              </div>
            </div>

            {/* Right Section: Team Standing Info */}
            <div>
              <div className="space-y-2">
                <p className="text-lg text-gray-300">
                  <span className="font-semibold text-orange-400">Conference:</span> {firstCharUpperCase(teamStanding.conference.name)}
                </p>
                <p className="text-lg text-gray-300">
                  <span className="font-semibold text-orange-400">Division:</span> {firstCharUpperCase(teamStanding.division.name)}
                </p>
                <p className="text-lg text-gray-300">
                  <span className="font-semibold text-orange-400">Wins:</span> {teamStanding.win.total}
                  <span className="ml-4 font-semibold text-orange-400">Losses:</span> {teamStanding.loss.total}
                </p>
                <p className="text-lg text-gray-300">
                  <span className="font-semibold text-orange-400">Overall Ranking:</span> #{teamStanding.conference.rank}
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Team Stats */}
        {teamStats && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Season Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <p className="text-gray-400">
                <span className="font-semibold text-orange-400">Games Played:</span> {teamStats.games}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-orange-400">Total Points:</span> {teamStats.points}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-orange-400">Field Goal %:</span> {teamStats.fgp}%
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-orange-400">3-Point %:</span> {teamStats.tpp}%
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-orange-400">Free Throw %:</span> {teamStats.ftp}%
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-orange-400">Total Rebounds:</span> {teamStats.totReb}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-orange-400">Total Assists:</span> {teamStats.assists}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-orange-400">Total Steals:</span> {teamStats.steals}
              </p>
            </div>
          </div>
        )}

        {/* Tabs for Played and Upcoming Games */}
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

        {/* Tabs Content */}
        {selectedTab === "played" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
            {playedGames.length > 0 ? (
              playedGames.map((game) => <Link to={`/game/${game.id}`} key={game.id} className="w-full mx-auto transform hover:scale-105 transition-transform duration-300"><GameCard game={game} standings={standings} /></Link>)
            ) : (
              <p className="text-center text-gray-400">No games played yet.</p>
            )}
          </div>
        )}
        {selectedTab === "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
            {upcomingGames.length > 0 ? (
              upcomingGames.map((game) => <Link to={`/game/${game.id}`} key={game.id} className="w-full mx-auto transform hover:scale-105 transition-transform duration-300"><GameCard game={game} standings={standings} /></Link>)
            ) : (
              <p className="text-center text-gray-400">No upcoming games scheduled.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamPage;
