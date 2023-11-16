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
    <section>
      <h1>Races</h1>
      <section>{getRacesJSX()}</section>
    </section>
  );
};

export default RacesList;
