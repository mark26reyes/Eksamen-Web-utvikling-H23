import RacesItem from "./RacesItem";
import RacesContext from "../../contexts/RacesContext";
import { useContext, useEffect } from "react";
import RacesService from "../../services/RacesService";
const RacesList = () => {
  const { races } = useContext(RacesContext);

  const getRacesJSX = () => {
    const racesJSX = races.map((_races, i) => (
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
      <h1>Races</h1>
      <div className="row">
        {getRacesJSX().map((races, index) => (
          <div key={index} className="col-lg-12 mb-4">
            <div className="card shadow-sm bg-body-tertiary rounded">
              <div className="card-body">{races}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RacesList;
