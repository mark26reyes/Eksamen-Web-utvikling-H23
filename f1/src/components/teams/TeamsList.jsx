import { useContext, useEffect } from "react";
import React from "react";
import TeamsItem from "./TeamsItem";
import F1Service from "../../services/F1Service";
import TeamsContext from "../../contexts/TeamsContext";

const TeamsList = () => {
  const { teams } = useContext(TeamsContext);

  const getTeamsJSX = () => {
    const teamsJSX = teams.map((_teams, i) => (
      <TeamsItem
        key={i}
        manufactur={_teams.manufactur}
        image={_teams.image}
        driverName={_teams.driverName}
        driverName2={_teams.driverName2}
      />
    ));
    return teamsJSX;
  };
  return (
    <section>
      <h1>Teams</h1>
      <section>{getTeamsJSX()}</section>
    </section>
  );
};

export default TeamsList;
