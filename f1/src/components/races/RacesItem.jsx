// RacesItem.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const RacesItem = ({ winnerName, winnerTime, grandPrix, numberOfLaps }) => {
  return (
    <tr className="table-row">
      <td>{grandPrix}</td>
      <td>{winnerName}</td>
      <td>{winnerTime}</td>
      <td>{numberOfLaps}</td>
    </tr>
  );
};

export default RacesItem;
