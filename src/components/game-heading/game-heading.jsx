/* eslint-disable react/prop-types */

import dayjs from '../../lib/dayjs';
import teamsData from '../../data/teams-data.json';
import { Link } from 'react-router-dom';

function GameHeading({ game, teams }) {

    /////////////////////////////////
    // THE TEAMS INFO WILL BE SAVED IN A JSON LOCALLY!!
    ////////////////////////////////

    const [visitorTeamStanding, homeTeamStanding] = teams;

    const visitorTeam = teamsData.find(team => team.id === visitorTeamStanding.team.id);
    const homeTeam = teamsData.find(team => team.id === homeTeamStanding.team.id);

    return (
        <div
          className="flex flex-col items-center justify-center p-6 w-screen hover:shadow-lg transition-transform duration-600 shadow-inner"
          style={{
            background: `linear-gradient(135deg, ${visitorTeam.visitorColor} 0%, #111827 50%,  ${homeTeam.homeColor} 100%)`,
            boxShadow: "inset 0 6px 12px rgba(0, 0, 0, 0.7), inset 0 -6px 12px rgba(0, 0, 0, 0.7)",
          }}
        >
          {/* Match Date */}
          <h2 className="text-2xl font-semibold mt-4 mb-6 text-white text-center">
            {dayjs(game.date.start).format("ll")}
          </h2>
      
          {/* Teams and scores */}
          <div className="flex items-center justify-center w-full text-white">
            {/* Visitor Team */}
            <div className="flex flex-col items-center mx-8">
              <Link to={`/team/${visitorTeam.id}`} className="flex items-center justify-center"><img src={visitorTeam.logo} alt="Visitor Team Logo" className="min-h-28 min-w-28 mb-2 hover:animate-bounceFromCurrent" /></Link>
              <h3 className="text-lg font-bold text-center">{visitorTeam.code}</h3>
              <p className="text-sm text-gray-200">{`${visitorTeamStanding.win.total} - ${visitorTeamStanding.loss.total}`}</p>
            </div>
      
            {/* Score */}
            {(game.status.short === 3) ? (
              <div className="flex flex-col items-center mx-8">
                <h2 className="text-4xl font-bold">
                  <span
                    className={`${
                      game.scores.visitors.points > game.scores.home.points ? "text-orange-300 font-extrabold animate-alphaBlink" : ""
                    }`}
                  >
                    {game.scores.visitors.points}
                  </span>
                  {" - "}
                  <span
                    className={`${
                      game.scores.home.points > game.scores.visitors.points ? "text-orange-300 font-extrabold animate-alphaBlink" : ""
                    }`}
                  >
                    {game.scores.home.points}
                  </span>
                </h2>
              </div>
            ) : (
              <span className="text-gray-400 text-xl font-extrabold mx-4 animate-alphaBlink">PENDING</span>
            )}
      
            {/* Home Team */}
            <div className="flex flex-col items-center mx-8">
              <Link to={`/team/${homeTeam.id}`} className="flex items-center justify-center"><img src={homeTeam.logo} alt="Home Team Logo" className="min-h-28 min-w-28 mb-2 hover:animate-bounceFromCurrent" /></Link>
              <h3 className="text-lg font-bold text-center">{homeTeam.code}</h3>
              <p className="text-sm text-gray-200">{`${homeTeamStanding.win.total} - ${homeTeamStanding.loss.total}`}</p>
            </div>
          </div>
      
          {/* Stadium information */}
          <h2 className="text-l font-semibold mt-6 mb-4 text-white text-center">
            {`${game.arena.name}, ${game.arena.city}`}
          </h2>
        </div>
      );
      
      
}

export default GameHeading;