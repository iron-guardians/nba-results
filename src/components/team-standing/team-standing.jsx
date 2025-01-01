import { Link } from "react-router-dom";

function TeamStanding({ team }) {
    return (
        <Link
                to={`/team/${team.team.id}`}
                key={team.team.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300"
                >
                <div className="flex items-center m-2">
                <p className="text-gray-300 font-bold text-2xl">
                        #{team.conference.rank}
                    </p>
                    <div className="flex items-center">
                        <img
                        src={team.logo}
                        alt={`${team.team.name} Logo`}
                        className="w-16 h-16 object-contain mr-4"
                        />
                        <div>
                        <h3 className="text-lg font-bold text-orange-400">{team.team.name}</h3>
                        <p className="text-gray-400">
                            Wins: {team.win.total} - Losses: {team.loss.total}
                        </p>
                        </div>
                    </div>
                </div>
                    
                    <p className="text-gray-300 font-bold">
                        Win Percentage: {team.win.percentage}%
                    </p>

                    <p className="text-gray-300 font-bold">
                        Streak: <span style={{ color: team.winStreak ? "green" : "red" }}>{`${team.winStreak ? "W" : "L"}${team.streak}`}</span>
                    </p>
                    <p className="text-gray-300 font-bold">
                        Last 10 Games: {`${team.win.lastTen} - ${team.loss.lastTen}`}
                    </p>
                </Link>
    )
}

export default TeamStanding;