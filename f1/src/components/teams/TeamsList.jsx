import { useContext, useEffect } from "react";
import React from "react";
import TeamsItem from "./TeamsItem";
import TeamsContext from "../../contexts/TeamsContext";
import TeamsService from "../../services/TeamsService";

const TeamsList = () => {
  const { teams } = useContext(TeamsContext);

  const getTeamsJSX = () => {
    const teamsJSX = teams.map((_teams, i) => (
      <TeamsItem
        key={i}
        manufacturer={_teams.manufacturer}
        image={_teams.image}
        driverName={_teams.driverName}
        driverName2={_teams.driverName2}
      />
    ));
    return teamsJSX;
  };
  return (
    <div className="container">
      <div className="border-bottom border-dark pb-3">
        <h1>Teams</h1>
      </div>
      <section className="row pt-4">
        {getTeamsJSX().map((teams, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card shadow-sm bg-body-tertiary rounded">
              <div className="card-body">{teams}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TeamsList;
