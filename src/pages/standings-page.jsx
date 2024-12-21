import React from "react";
import standings from "../data/standings.json";
import teamsData from "../data/teams-data.json";

function StandingsPage() {
  // Combinar información de standings con datos del equipo
  const rankedTeams = standings.response.map((standing) => {
    const teamData = teamsData.find((team) => team.id === standing.team.id);
    return {
      ...standing,
      logo: teamData.logo,
    };
  });

  // Ordenar equipos por posición
  rankedTeams.sort((a, b) => a.position - b.position);

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-40">
      <div className="container mx-auto pt-6 pb-12">
        <h1 className="text-3xl font-semibold text-blue-400 mb-10 text-center">
          League Standings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
          {rankedTeams.map((team) => (
            <div
              key={team.team.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300"
            >
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
              <div className="text-gray-300 font-bold text-2xl">
                #{team.position}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StandingsPage;
