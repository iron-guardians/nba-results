import { Link } from "react-router-dom";
import teamsData from "../data/teams-data.json";

function TeamsListPage() {
  // Group teams by conference
  const groupedTeams = teamsData.reduce((acc, team) => {
    const { conference } = team;
    if (!acc[conference]) acc[conference] = [];
    acc[conference].push(team);
    return acc;
  }, {});

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-16">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-semibold text-blue-400 text-center mb-10">
          NBA Teams by Conference
        </h1>

        {Object.entries(groupedTeams).map(([conference, teams]) => (
          <div key={conference} className="mb-12">
            <h2 className="text-3xl font-semibold text-blue-500 mb-6 text-center">
              {conference} Conference
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
              {teams.map((team) => (
                <Link
                  key={team.id}
                  to={`/team/${team.id}`}
                  className="flex items-center justify-center bg-gray-800 rounded-lg hover:shadow-xl transition-shadow"
                  style={{
                    aspectRatio: "1", // Ensures the buttons are square
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

export default TeamsListPage;
