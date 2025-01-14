/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import teamsData from '../../data/teams-data.json';
import dayjs from 'dayjs'; // Assures you have dayjs installed to handle dates

function GameCard({ game, currentGameDate, standings }) {

  const visitorTeamStanding = standings.find(
    (standing) => standing.team.id === game.teams.visitors.id
  );
  const homeTeamStanding = standings.find(
    (standing) => standing.team.id === game.teams.home.id
  );

  const homeTeam = teamsData.find((team) => team.id === homeTeamStanding.team.id);
  const visitorTeam = teamsData.find((team) => team.id === visitorTeamStanding.team.id);

  // Formatting the match date
  const gameDate = dayjs(game.date.start);
  const isDateBeforeCurrentGame = gameDate.isBefore(dayjs(currentGameDate), 'day'); // Compare with the current match date
  const formattedDate = gameDate.format('MMMM DD, YYYY');

  return (
    <div className="flex items-center justify-between border-gray-700 rounded-lg p-4 bg-gray-800 shadow-md hover:shadow-lg transition-transform duration-600">
      {/* Team 1 */}
      <div className="flex flex-col items-center group">
        <Link to={`/team/${visitorTeam.id}`} className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-20 h-20 flex items-center justify-center overflow-hidden group-hover:animate-bounceFromCurrent">
            <img
              src={visitorTeam.logo}
              alt="Visitor Team Logo"
              className="min-h-20 min-w-20 object-contain"
            />
          </div>
        </Link>
        <h3 className="text-sm font-semibold mt-2 text-orange-400">{visitorTeam.code}</h3>
        <p className="text-xs text-gray-300">
          {visitorTeamStanding.win.total} - {visitorTeamStanding.loss.total}
        </p>
      </div>

      {/* Score */}
      {game.status.short === 3 ? (
        <div className="text-center flex flex-col justify-center mx-4">
          <h2 className="text-3xl font-bold text-white relative">
            <span
              className={`${
                game.scores.visitors.points > game.scores.home.points
                  ? 'text-orange-400 glow'
                  : 'text-gray-400'
              }`}
            >
              {game.scores.visitors.points}
            </span>
            {' - '}
            <span
              className={`${
                game.scores.home.points > game.scores.visitors.points
                  ? 'text-orange-400 glow'
                  : 'text-gray-400'
              }`}
            >
              {game.scores.home.points}
            </span>
          </h2>
          {(isDateBeforeCurrentGame || gameDate.isSame(dayjs(currentGameDate), 'day') ) && (
            <p className="text-xs text-gray-300 mt-2">{formattedDate}</p>
          )} {/* Match date */}
        </div>
      ) : (
        <div className="text-center flex flex-col justify-center mx-4">
          <span className="text-gray-400 text-sm font-medium">TO BE PLAYED</span>
            <p className="text-xs text-gray-300 mt-2">{formattedDate}</p>
        </div>
      )}

      {/* Team 2 */}
      <div className="flex flex-col items-center group">
        <Link to={`/team/${homeTeam.id}`} className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-20 h-20 flex items-center justify-center overflow-hidden group-hover:animate-bounceFromCurrent">
            <img
              src={homeTeam.logo}
              alt="Home Team Logo"
              className="min-h-20 min-w-20 object-contain"
            />
          </div>
        </Link>
        <h3 className="text-sm font-semibold mt-2 text-orange-400">{homeTeam.code}</h3>
        <p className="text-xs text-gray-300">
          {homeTeamStanding.win.total} - {homeTeamStanding.loss.total}
        </p>
      </div>
    </div>
  );
}

export default GameCard;
