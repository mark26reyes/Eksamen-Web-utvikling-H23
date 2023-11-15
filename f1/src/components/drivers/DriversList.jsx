import { useContext, useEffect } from "react";
import React from "react";
import DriversItem from "./DriversItem";
import F1Service from "../../services/F1Service";
import DriverContext from "../../contexts/DriverContext";

const DriversList = () => {
  const { drivers, setDrivers } = useContext(DriverContext);

  const getDriversJSX = () => {
    const driversJSX = drivers.map((driver) => (
      <DriversItem key={i} name={driver.name} image={driver.image} />
    ));
    return driversJSX;
  };
  return (
    <section>
      <h1>Drivers</h1>
      {getDriversJSX()}
    </section>
  );
};

export default DriversList;
