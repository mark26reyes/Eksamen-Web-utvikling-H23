import React from "react";

function RacesList({ races }) {
  return (
    <div>
      <h2>Races List</h2>
      <ul>
        {races.map((race, index) => (
          <li key={index}>{race.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RacesList;
