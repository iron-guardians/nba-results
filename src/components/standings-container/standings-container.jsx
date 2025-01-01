import { Link } from "react-router-dom";
import TeamStanding from "../team-standing/team-standing.jsx";

function StandingsContainer({rankedTeams})
{
    return (
        <div className="grid grid-cols-1 gap-y-8 gap-x-4">
            {rankedTeams.map((team) => (
                <TeamStanding key={team.id} team={team} />
            ))}
        </div>    
    );
}

export default StandingsContainer;