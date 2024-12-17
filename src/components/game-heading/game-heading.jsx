/* eslint-disable react/prop-types */

import dayjs from '../../lib/dayjs';

function GameHeading({ game, teams }) {

    /////////////////////////////////
    // THE TEAMS INFO WILL BE SAVED IN A JSON LOCALLY!!
    ////////////////////////////////

    const [visitorTeamStanding, homeTeamStanding] = teams;

    const visitorTeam = visitorTeamStanding.team;
    const homeTeam = homeTeamStanding.team;

    return (
        <div className="flex flex-col items-center  justify-center p-4 w-full ">
            <h2 className="text-2xl font-semibold mb-10">{dayjs(game.date.start).format('ll')}</h2>

            <div className='flex items-center justify-between w-full'>
                
                
                {/* Team 1 */}
                <div className='flex items-center'>
                    <h3 className="text-lg font-bold mt-2 mr-20 text-right">{visitorTeam.code}</h3>
                    <div className="flex flex-col items-center">
                        <img src={visitorTeam.logo} alt="Logo" className="max-h-28 max-w-28" />
                        <p className="text-sm text-gray-500">{visitorTeamStanding.win.total} - {visitorTeamStanding.loss.total}</p>
                    </div>
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
                    <p className="text-sm text-gray-500">{homeTeamStanding.win.total} - {homeTeamStanding.loss.total}</p>
                </div>
                <h3 className="text-lg font-bold mt-2 ml-20">{homeTeam.code}</h3>
            </div>

            <h2 className="text-2xl font-semibold mt-10">{`${game.arena.name}, ${game.arena.city}`}</h2>
        </div>
      );
}

export default GameHeading;