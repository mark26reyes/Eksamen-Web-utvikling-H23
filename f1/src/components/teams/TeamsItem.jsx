import React from "react";
import TeamsService from "../../services/TeamsService";

// Funksjonell komponent for å vise informasjon om et team
const TeamsItem = ({ manufacturer, image, driverName, driverName2 }) => {
  // Henter baseURL fra TeamsService for å bygge bildets URL
  const baseURL = TeamsService.getBaseUrl();

  // JSX for å vise informasjon om teamet
  return (
    <section>
      {/* Viser produsenten av bilen */}
      <h3 className="border-bottom border-secondary pb-3">{manufacturer}</h3>
      {/* Bilde av teamet med kilde fra baseURL og image-prop'en */}
      <img src={`${baseURL}/${image}`} width={"400px"} alt="Bilde av teams" />
      <p>D1: {driverName}</p>
      <p>D2: {driverName2}</p>
    </section>
  );
};

export default TeamsItem;
