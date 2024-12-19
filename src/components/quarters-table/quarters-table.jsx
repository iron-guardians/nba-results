/* eslint-disable react/prop-types */

function QuartersTable({ game, teams }) {
    const [visitorTeamStanding, homeTeamStanding] = teams;
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left"> </th>
              <th className="px-4 py-2">Q1</th>
              <th className="px-4 py-2">Q2</th>
              <th className="px-4 py-2">Q3</th>
              <th className="px-4 py-2">Q4</th>
              <th className="px-4 py-2">FINAL</th>
            </tr>
          </thead>
          <tbody>
            {/* Visitor Team Row */}
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2">
                <img
                  src={visitorTeamStanding.team.logo}
                  alt="Visitor Team Logo"
                  className="max-h-20 max-w-20"
                />
              </td>
              <td className="px-4 py-2 text-center">{game.scores.visitors.linescore[0]}</td>
              <td className="px-4 py-2 text-center">{game.scores.visitors.linescore[1]}</td>
              <td className="px-4 py-2 text-center">{game.scores.visitors.linescore[2]}</td>
              <td className="px-4 py-2 text-center">{game.scores.visitors.linescore[3]}</td>
              <td className="px-4 py-2 text-center font-bold">{game.scores.visitors.points}</td>
            </tr>
  
            {/* Home Team Row */}
            <tr>
              <td className="px-4 py-2">
                <img
                  src={homeTeamStanding.team.logo}
                  alt="Home Team Logo"
                  className="max-h-20 max-w-20"
                />
              </td>
              <td className="px-4 py-2 text-center">{game.scores.home.linescore[0]}</td>
              <td className="px-4 py-2 text-center">{game.scores.home.linescore[1]}</td>
              <td className="px-4 py-2 text-center">{game.scores.home.linescore[2]}</td>
              <td className="px-4 py-2 text-center">{game.scores.home.linescore[3]}</td>
              <td className="px-4 py-2 text-center font-bold">{game.scores.home.points}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default QuartersTable;
  