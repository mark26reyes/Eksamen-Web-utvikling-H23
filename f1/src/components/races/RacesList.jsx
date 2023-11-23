import RacesItem from "./RacesItem";
import RacesContext from "../../contexts/RacesContext";
import { useContext } from "react";
import SearchRace from "./SearchRaces";

const RacesList = () => {
  const { filteredRaces } = useContext(RacesContext);

  const getRacesJSX = () => {
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
        <h1 className="f1-black-font fs-1">Races 2023</h1>
        <SearchRace />
      </div>

      <br />
      <section className="row">
        <div className="col-lg-12">
          {filteredRaces.length === 0 ? (
            <p>No races found.</p>
          ) : (
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
