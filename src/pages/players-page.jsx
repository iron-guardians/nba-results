import React from "react";
import playersData from "../data/players.json"; // Assures the route is the right one

function PlayersPage() {
  // Sort players by points (ranking
  const rankedPlayers = [...playersData].sort((a, b) => b.stats.points - a.stats.points);

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-40">
      <div className="container mx-auto pt-6 pb-12">
        <h1 className="text-3xl font-semibold text-blue-400 mb-10 text-center">
          Player Rankings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
          {rankedPlayers.map((player, index) => (
            <div
              key={player.id}
              className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 flex items-center justify-between"
            >
              {/* Player Info */}
              <div className="flex items-center">
                <img
                  src={player.photo}
                  alt={`${player.name} Photo`}
                  className="w-16 h-16 object-cover rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-orange-400">{player.name}</h3>
                  <p className="text-gray-400">{player.team}</p>
                </div>
              </div>

              {/* Player Stats */}
              <div className="text-gray-300 text-right">
                <p>
                  <span className="font-bold text-blue-400">Points:</span> {player.stats.points}
                </p>
                <p>
                  <span className="font-bold text-blue-400">Rebounds:</span> {player.stats.rebounds}
                </p>
                <p>
                  <span className="font-bold text-blue-400">Assists:</span> {player.stats.assists}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayersPage;
