/* eslint-disable react/prop-types */

import dayjs from '../../lib/dayjs';
import teamsData from '../../data/teams-data.json';

function GameHeading({ game, teams }) {

    /////////////////////////////////
    // THE TEAMS INFO WILL BE SAVED IN A JSON LOCALLY!!
    ////////////////////////////////

    const [visitorTeamStanding, homeTeamStanding] = teams;

    const visitorTeam = teamsData.find(team => team.id === visitorTeamStanding.team.id);
    const homeTeam = teamsData.find(team => team.id === homeTeamStanding.team.id);

    return (
        <div
          className="flex flex-col items-center justify-center p-6 w-full hover:shadow-lg transition-transform duration-600 shadow-inner"
          style={{
            background: `linear-gradient(135deg, ${visitorTeam.visitorColor} 0%, #111827 50%,  ${homeTeam.homeColor} 100%)`,
            boxShadow: "inset 0 6px 12px rgba(0, 0, 0, 0.7), inset 0 -6px 12px rgba(0, 0, 0, 0.7)",
          }}
        >
          {/* Fecha del partido */}
          <h2 className="text-2xl font-semibold mb-6 mt-10 text-white text-center">
            {dayjs(game.date.start).format("ll")}
          </h2>
      
          {/* Equipos y marcador */}
          <div className="flex items-center justify-center w-full text-white">
            {/* Equipo visitante */}
            <div className="flex flex-col items-center mx-8">
              <img src={visitorTeam.logo} alt="Visitor Team Logo" className="min-h-28 min-w-28 mb-2" />
              <h3 className="text-lg font-bold text-center">{visitorTeam.code}</h3>
              <p className="text-sm text-gray-200">{`${visitorTeamStanding.win.total} - ${visitorTeamStanding.loss.total}`}</p>
            </div>
      
            {/* Marcador */}
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
      
            {/* Equipo local */}
            <div className="flex flex-col items-center mx-8">
              <img src={homeTeam.logo} alt="Home Team Logo" className="min-h-28 min-w-28 mb-2" />
              <h3 className="text-lg font-bold text-center">{homeTeam.code}</h3>
              <p className="text-sm text-gray-200">{`${homeTeamStanding.win.total} - ${homeTeamStanding.loss.total}`}</p>
            </div>
          </div>
      
          {/* Información del estadio */}
          <h2 className="text-l font-semibold mb-7 mt-7 text-white text-center">
            {`${game.arena.name}, ${game.arena.city}`}
          </h2>
        </div>
      );
      
      
}

export default GameHeading;