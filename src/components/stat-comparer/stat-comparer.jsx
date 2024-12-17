/* eslint-disable react/prop-types */
function StatComparer({ stat }) {
    
    return (
        <div className="space-y-4 mt-4 w-96">

         <h2 className="text-lg font-semibold">{stat.statName}</h2>
         <div className="flex flex-col items-start">
            <div className="flex items-center gap-4">
                {/* Second Field Goal - Attempts/Total */}
                <div className="flex items-center space-x-2 gap-4">
                    <span className="text-gray-600">{stat.visitorTeam.code}</span>
                    <span className="text-sm font-bold">{stat.visitorsMade} / {stat.visitorsAttempted}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-2 bg-gray-300 rounded-full">
                    <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(stat.visitorsMade / stat.visitorsAttempted) * 100}%` }}
                    ></div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {/* Second Field Goal - Attempts/Total */}
                <div className="flex items-center space-x-2 gap-4">
                    <span className="text-gray-600">{stat.homeTeam.code}</span>
                    <span className="text-sm font-bold">{stat.homeMade} / {stat.homeAttempted}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-2 bg-gray-300 rounded-full">
                    <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(stat.homeMade / stat.homeAttempted) * 100}%` }}
                    ></div>
                </div>
            </div>
         </div>

        </div>
      );
}

export default StatComparer;
