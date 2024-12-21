/* eslint-disable react/prop-types */

function QuartersTable({ game, teams }) {
    const [visitorTeam, homeTeam] = teams;

    return (
      <div
        className="overflow-x-auto shadow-md hover:shadow-lg transition-transform duration-600 p-4">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="px-4 py-2 text-left"> </th>
              <th className="px-4 py-2 text-center">Q1</th>
              <th className="px-4 py-2 text-center">Q2</th>
              <th className="px-4 py-2 text-center">Q3</th>
              <th className="px-4 py-2 text-center">Q4</th>
              <th className="px-4 py-2 text-center">FINAL</th>
            </tr>
          </thead>
          <tbody>
            {/* Visitor Team Row */}
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2">
                <img
                  src={visitorTeam.logo}
                  alt="Visitor Team Logo"
                  className="max-h-20 max-w-20 mx-auto"
                />
              </td>
              {game.scores.visitors.linescore.map((score, index) => (
                <td key={index} className="px-4 py-2 text-center text-gray-200">
                  {score}
                </td>
              ))}
              <td className="px-4 py-2 text-center font-bold text-orange-300">
                {game.scores.visitors.points}
              </td>
            </tr>
    
            {/* Home Team Row */}
            <tr>
              <td className="px-4 py-2">
                <img
                  src={homeTeam.logo}
                  alt="Home Team Logo"
                  className="max-h-20 max-w-20 mx-auto"
                />
              </td>
              {game.scores.home.linescore.map((score, index) => (
                <td key={index} className="px-4 py-2 text-center text-gray-200">
                  {score}
                </td>
              ))}
              <td className="px-4 py-2 text-center font-bold text-orange-300">
                {game.scores.home.points}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    
  }
  
  export default QuartersTable;
  