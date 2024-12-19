/* eslint-disable react/prop-types */

import StatLineBar from "./stat-line-bar";

function StatComparer({ stat }) {

    const bestStat = stat.visitorsMade > stat.homeMade ? stat.visitorsMade : stat.homeMade;

    return (
        <div className="space-y-4 mt-4 w-96 mb-4 p-4 rounded-lg border border-gray-700 bg-gray-800 shadow-md hover:shadow-lg transition-transform duration-600">
          {/* Título de la estadística */}
          <h2 className="text-lg font-semibold text-white">{stat.statName}</h2>
          
          {/* Barras de estadísticas */}
          <div className="flex flex-col items-start space-y-4">
            <StatLineBar
              stat={{
                team: stat.visitorsTeam,
                made: stat.visitorsMade,
                attempted: stat.isPercentage ? stat.visitorsAttempted : bestStat,
                isPercentage: stat.isPercentage,
                isHome: false
              }}
            />
      
            <StatLineBar
              stat={{
                team: stat.homeTeam,
                made: stat.homeMade,
                attempted: stat.isPercentage ? stat.homeAttempted : bestStat,
                isPercentage: stat.isPercentage,
                isHome: true
              }}
            />
          </div>
        </div>
      );
      
}

export default StatComparer;
