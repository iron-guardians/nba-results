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
        <div className="flex items-center justify-between border rounded-lg p-4 w-96 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 hover:animate-pulse">
          {/* Team 1 */}
          <div className="flex flex-col items-center group">
            <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden transition-transform duration-300 group-hover:animate-bounce">
                <img src={visitorTeam.logo} 
                     alt="Logo" 
                     className="max-h-20 max-w-20 object-contain" 
                />
            </div>
            <h3 className="text-lg font-bold mt-2 text-gray-800">{visitorTeam.code}</h3>
            <p className="text-sm text-gray-500">{visitorTeamStanding.win.total} - {visitorTeamStanding.loss.total}</p>
          </div>
    
          {/* Score */}
          <div className="text-center flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-900 relative">
            <span className={`${game.scores.visitors.points > game.scores.home.points ? 'font-extrabold text-blue-600' : ''}`}>{game.scores.visitors.points}</span>

            <span className="font-extrabold text-orange-500 shadow-lg glow">-</span>
            
            <span className={`${game.scores.home.points > game.scores.visitors.points ? 'font-extrabold text-blue-600' : ''}`}>{game.scores.home.points}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">Points</p>
          </div>
    
          {/* Team 2 */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden">
              <img src={homeTeam.logo} alt="Logo" className="max-h-20 max-w-20" />
            </div>
            <h3 className="text-lg font-bold mt-2 text-gray-800">{homeTeam.code}</h3>
            <p className="text-sm text-gray-500">{homeTeamStanding.win.total} - {homeTeamStanding.loss.total}</p>
          </div>
        </div>
      );
}

export default GameCard;