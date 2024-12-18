/* eslint-disable react/prop-types */

import StatLineBar from "./stat-line-bar";

function StatComparer({ stat }) {

    const bestStat = stat.visitorsMade > stat.homeMade ? stat.visitorsMade : stat.homeMade;

    return (
        <div className="space-y-4 mt-4 w-96">

            <h2 className="text-lg font-semibold mb-0">{stat.statName}</h2>
            <div className="flex flex-col items-start">
                <StatLineBar stat={{
                    team: stat.visitorsTeam,
                    made: stat.visitorsMade,
                    attempted: stat.isPercentage ? stat.visitorsAttempted : bestStat,
                    isPercentage: stat.isPercentage
                }} />
            
                <StatLineBar stat={{
                        team: stat.homeTeam,
                        made: stat.homeMade,
                        attempted: stat.isPercentage ? stat.homeAttempted : bestStat,
                        isPercentage: stat.isPercentage
                }} />

            </div>

        </div>
      );
}

export default StatComparer;
