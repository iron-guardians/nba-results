import React, { useEffect, useState } from "react";
import teamsData from "../data/teams-data.json";
import * as DunkNationApi from "../services/api-service";
import StandingContainer from "../components/standings-container/standings-container";

function StandingsPage() {
  // Combine standings and team data
  const [eastRankedTeams, setEastRankedTeams] = useState([]);
  const [westRankedTeams, setWestRankedTeams] = useState([]);

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
        <h1 className="text-3xl font-semibold text-blue-400 mb-10 text-center">
          East Conference
        </h1>
        <div className="grid grid-cols-1gap-y-8 gap-x-4">
          <StandingContainer rankedTeams={eastRankedTeams} />
        </div>
      </div>

      <div className="container mx-auto pt-6 pb-12">
        <h1 className="text-3xl font-semibold text-blue-400 mb-10 text-center">
          West Conference
        </h1>
        <div className="grid grid-cols-1gap-y-8 gap-x-4">
          <StandingContainer rankedTeams={westRankedTeams} />
        </div>
      </div>
    </div>
  );
}

export default StandingsPage;
