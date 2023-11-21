import RacesItem from "./RacesItem";
import RacesContext from "../../contexts/RacesContext";
import { useContext } from "react";
import SearchRace from "./SearchRaces";

const RacesList = () => {
  // Use filteredRaces instead of races
  const { filteredRaces } = useContext(RacesContext);

  const getRacesJSX = () => {
    // Map over filteredRaces to create JSX elements
    const racesJSX = filteredRaces.map((_races, i) => (
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

  return (
    <div className="container">
      <div className="header-flex border-bottom border-dark pb-3">
        <h1>Races</h1>
        <SearchRace />
      </div>

      <br />
      <section className="row">
        {getRacesJSX().map((race, index) => (
          <div key={index} className="col-lg-12 mb-4">
            <div className="card shadow-sm bg-body-tertiary rounded">
              <div className="card-body">{race}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default RacesList;
