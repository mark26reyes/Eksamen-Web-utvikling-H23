import { useContext, useEffect } from "react";
import React from "react";
import DriversItem from "./DriversItem";
import F1Service from "../../services/F1Service";
import DriverContext from "../../contexts/DriverContext";

const DriversList = () => {
  const { drivers } = useContext(DriverContext);

  const getDriversJSX = () => {
    const driversJSX = drivers.map((_drivers, i) => (
      <DriversItem
        key={i}
        name={_drivers.name}
        age={_drivers.age}
        image={_drivers.image}
      />
    ));
    return driversJSX;
  };
  return (
    <section>
      <h1>Drivers</h1>
      <section>{getDriversJSX()}</section>
    </section>
  );
};

export default DriversList;
