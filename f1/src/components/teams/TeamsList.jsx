import React from "react";

function TeamsList({ teams }) {
  return (
    <div>
      <h2>Teams List</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeamsList;
