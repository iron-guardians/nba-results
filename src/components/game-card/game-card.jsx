/* eslint-disable react/prop-types */

import standings from '../../data/standings.json';

function GameCard({ game }) {
    
    const visitorTeamStanding = standings.response.find(standing => standing.team.id === game.teams.visitors.id);
    const homeTeamStanding = standings.response.find(standing => standing.team.id === game.teams.home.id);

    const homeTeam = homeTeamStanding.team;
    const visitorTeam = visitorTeamStanding.team;


    /////////////////////////////////
    // THE TEAMS INFO WILL BE SAVED IN A JSON LOCALLY!!
    ////////////////////////////////

    return (
        <div className="flex items-center justify-between border rounded-lg p-4 w-96 bg-white shadow-md">
          {/* Team 1 */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 flex items-center justify-center">
                <img src={visitorTeam.logo} alt="Logo" className="max-h-28 max-w-28" />
            </div>
            <h3 className="text-lg font-bold mt-2">{visitorTeam.code}</h3>
            <p className="text-sm text-gray-500">{visitorTeamStanding.win.total} - {visitorTeamStanding.loss.total}</p>
          </div>
    
          {/* Score */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
            <span className={`${game.scores.visitors.points > game.scores.home.points ? 'font-extrabold' : ''}`}>{game.scores.visitors.points}</span>
            -
            <span className={`${game.scores.home.points > game.scores.visitors.points ? 'font-extrabold' : ''}`}>{game.scores.home.points}</span>
            </h2>
          </div>
    
          {/* Team 2 */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 flex items-center justify-center">
              <img src={homeTeam.logo} alt="Logo" className="max-h-28 max-w-28" />
            </div>
            <h3 className="text-lg font-bold mt-2">{homeTeam.code}</h3>
            <p className="text-sm text-gray-500">{homeTeamStanding.win.total} - {homeTeamStanding.loss.total}</p>
          </div>
        </div>
      );
}

export default GameCard;