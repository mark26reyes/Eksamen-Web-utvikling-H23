import RacesItem from "./RacesItem";
import RacesContext from "../../contexts/RacesContext";
import { useContext } from "react";
import SearchRace from "./SearchRaces";

// Funksjonell komponent for å vise listen over løp
const RacesList = () => {
  // Henter filteredRaces fra RacesContext ved hjelp av useContext-hook
  const { filteredRaces } = useContext(RacesContext);

  // Funksjon for å generere JSX for hvert løp i listen
  const getRacesJSX = () => {
    const racesJSX = filteredRaces.map((_races, i) => (
      // Bruker RacesItem-komponenten for å vise informasjon om hvert løp
      <RacesItem
        key={i}
        winnerName={_races.winnerName}
        winnerTime={_races.winnerTime}
        grandPrix={_races.grandPrix}
        numberOfLaps={_races.numberOfLaps}
      />
    ));
    return racesJSX;
  };

  // JSX for å vise RacesList-komponenten
  return (
    <div className="container">
      <div className="header-flex border-bottom border-dark pb-3">
        <h1 className="f1-black-font fs-1">Races 2023</h1>
        {/* Bruker SearchRace-komponenten for å legge til søkefunksjonalitet */}
        <SearchRace />
      </div>

      <br />
      {/* Seksjon for å vise løpene i en tabell */}
      <section className="row">
        <div className="col-lg-12">
          {/* Sjekker om det ikke er noen løp som er filtrert frem, viser en melding om ingen løp er funnet */}
          {filteredRaces.length === 0 ? (
            <p>No races found.</p>
          ) : (
            // Viser en tabell med overskrifter og løpsinformasjon hvis det er løp å vise
            <table className="table">
              <thead>
                <tr>
                  <th className="f1-bold-font">Grand Prix</th>
                  <th className="f1-bold-font">Winner</th>
                  <th className="f1-bold-font">Time</th>
                  <th className="f1-bold-font">Laps</th>
                </tr>
              </thead>
              <tbody>{getRacesJSX()}</tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default RacesList;
