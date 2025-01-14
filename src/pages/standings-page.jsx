import React, { useEffect, useState } from "react";
import teamsData from "../data/teams-data.json";
import * as DunkNationApi from "../services/api-service";
import StandingContainer from "../components/standings-container/standings-container";

function StandingsPage() {
  // Combine standings and team data
  const [eastRankedTeams, setEastRankedTeams] = useState([]);
  const [westRankedTeams, setWestRankedTeams] = useState([]);
  const [selectedConference, setSelectedConference] = useState("east"); // State for selected conference

  useEffect(() => {
    DunkNationApi.getStandings().then((response) => {
      const rankedTeams = response.map((standing) => {
        const teamData = teamsData.find((team) => team.id === standing.team.id);
        
        return {
          ...standing,
          logo: teamData?.logo || "default-logo.png",
        };
      })
      .sort((a, b) => a.conference.rank - b.conference.rank);

      setEastRankedTeams(rankedTeams.filter((team) => team.conference.name === "east"));
      setWestRankedTeams(rankedTeams.filter((team) => team.conference.name === "west"));
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  if (eastRankedTeams.length + westRankedTeams.length === 0) {
    return (
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">No standings available</h1>
      </div>
    );
  }

  return (
  
    <div className="bg-gray-900 text-white min-h-screen pt-40">
    <div className="container mx-auto pt-6 pb-12">
    <h1 className="text-6xl font-bold text-center pb-10 text-blue-400 mb-10">
          Standings
        </h1>
    <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedConference("east")}
          className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${selectedConference === "east" ? "bg-blue-500" : "bg-gray-700"} text-white`}
        >
          East Conference
        </button>
        <button
          onClick={() => setSelectedConference("west")}
          className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 ${selectedConference === "west" ? "bg-blue-500" : "bg-gray-700"} text-white`}
        >
          West Conference
        </button>
      </div>

      {selectedConference === "east" && (
          <div className="grid grid-cols-1 gap-y-8 gap-x-4">
            <StandingContainer rankedTeams={eastRankedTeams} />
          </div>
      )}

      {selectedConference === "west" && (
          <div className="grid grid-cols-1 gap-y-8 gap-x-4">
            <StandingContainer rankedTeams={westRankedTeams} />
          </div>
      )}
    </div>
  </div>
  );
}

export default StandingsPage;
