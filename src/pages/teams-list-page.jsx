import { Link } from "react-router-dom";
import React, { useState } from "react";
import teamsData from "../data/teams-data.json";

function TeamsListPage() {
  // Agrupar equipos por conferencia
  const groupedTeams = teamsData.reduce((acc, team) => {
    const { conference } = team;
    if (!acc[conference]) acc[conference] = [];
    acc[conference].push(team);
    return acc;
  }, {});

  // Estado para la pestaña activa
  const [selectedConference, setSelectedConference] = useState(
    Object.keys(groupedTeams)[0]
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-40">
      <div className="container mx-auto pt-6 pb-12">
        <h1 className="text-6xl font-bold text-center pb-10 text-blue-400 mb-10">
          NBA Teams by Conference
        </h1>

        {/* Tabs para las conferencias */}
        <div className="flex justify-center space-x-4 mb-10">
          {Object.keys(groupedTeams).map((conference) => (
            <button
              key={conference}
              onClick={() => setSelectedConference(conference)}
              className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                selectedConference === conference
                  ? "bg-blue-500"
                  : "bg-gray-700"
              }`}
            >
              {conference} Conference
            </button>
          ))}
        </div>

        {/* Contenido de la conferencia seleccionada */}
        {Object.entries(groupedTeams)
          .filter(([conference]) => conference === selectedConference)
          .map(([conference, teams]) => (
            <div key={conference} className="mb-12">
              <h2 className="text-3xl font-semibold text-blue-500 mb-6 text-center">
                {conference} Conference
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                {teams.map((team) => (
                  <Link
                    key={team.id}
                    to={`/team/${team.id}`}
                    className="flex items-center justify-center bg-gray-800 rounded-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
                    style={{
                      aspectRatio: "1", // Asegura que las tarjetas sean cuadradas
                    }}
                  >
                    <img
                      src={team.logo}
                      alt={`${team.name} logo`}
                      className="w-2/3 h-2/3 object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TeamsListPage

