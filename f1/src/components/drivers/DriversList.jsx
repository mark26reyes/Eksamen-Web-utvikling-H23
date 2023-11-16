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
        nationality={_drivers.nationality}
      />
    ));
    return driversJSX;
  };
  return (
    <div className="container">
      <h1>Drivers</h1>
      <div className="row">
        {getDriversJSX().map((driver, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm bg-body-tertiary rounded">
              <div className="card-body">{driver}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversList;
