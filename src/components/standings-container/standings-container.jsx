import TeamStanding from "../team-standing/team-standing.jsx";

function StandingsContainer({ rankedTeams }) {
  return (
    <div className="grid grid-cols-1 gap-y-8 gap-x-4">
      {rankedTeams.map((team) => (
        <div
          key={team.id}
          className="shadow-md hover:shadow-lg"
        >
          <TeamStanding team={team} />
        </div>
      ))}
    </div>
  );
}

export default StandingsContainer;
