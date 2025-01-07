import { Link } from "react-router-dom";

function TeamStanding({ team }) {
  return (
    <Link
      to={`/team/${team.team.id}`}
      key={team.team.id}
      className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
    >
      {/* Posición y Logo */}
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <p className="text-gray-300 font-bold text-2xl">#{team.conference.rank}</p>
        <img
          src={team.logo}
          alt={`${team.team.name} Logo`}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h3 className="text-lg font-bold text-orange-400">{team.team.name}</h3>
          <p className="text-gray-400">
            Wins: {team.win.total} - Losses: {team.loss.total}
          </p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
        <p className="text-gray-300 font-bold">
          Win Percentage: {team.win.percentage}%
        </p>
        <p className="text-gray-300 font-bold">
          Streak:{" "}
          <span
            style={{ color: team.winStreak ? "green" : "red" }}
          >{`${team.winStreak ? "W" : "L"}${team.streak}`}</span>
        </p>
        <p className="text-gray-300 font-bold">
          Last 10 Games: {`${team.win.lastTen} - ${team.loss.lastTen}`}
        </p>
      </div>
    </Link>
  );
}

export default TeamStanding;
