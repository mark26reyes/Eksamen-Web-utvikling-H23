import { useContext, useEffect } from "react";
import React from "react";
import TeamsItem from "./TeamsItem";
import TeamsContext from "../../contexts/TeamsContext";
import TeamsService from "../../services/TeamsService";

// Funksjonell komponent for å vise listen over F1-lag
const TeamsList = () => {
  // Henter teams fra TeamsContext ved hjelp av useContext-hook
  const { teams } = useContext(TeamsContext);

  // Funksjon for å generere JSX for hvert lag i listen
  const getTeamsJSX = () => {
    const teamsJSX = teams.map((_teams, i) => (
      // Bruker TeamsItem-komponenten for å vise informasjon om hvert lag
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

  // JSX for å vise TeamsList-komponenten
  return (
    <div className="container">
      {/* Overskriftsseksjon */}
      <div className="border-bottom border-dark pb-3">
        <h3 className="f1-black-font fs-1">F1 Teams 2023</h3>
      </div>
      {/* Seksjon for å vise lagene i rader */}
      <section className="row pt-4">
        {/* Mapper gjennom hvert lag og viser dem i en kolonne med bruk av TeamsItem-komponenten */}
        {getTeamsJSX().map((teams, index) => (
          <div key={index} className="col-lg-6 col-md-12 col-sm-12 mb-4">
            <div>
              {/* Card-body med rammer og padding for å vise laginformasjon */}
              <div className="card-body border-top border-end border-dark border-2 no-overflow p-3">
                {/* Viser informasjon om laget ved hjelp av TeamsItem-komponenten */}
                {teams}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TeamsList;
