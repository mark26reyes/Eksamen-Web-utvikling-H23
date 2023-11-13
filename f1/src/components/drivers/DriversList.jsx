import React from "react";

function DriversList({ drivers }) {
  return (
    <div>
      <h2>Drivers List</h2>
      <ul>
        {drivers.map((driver, index) => (
          <li key={index}>{driver.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DriversList;
