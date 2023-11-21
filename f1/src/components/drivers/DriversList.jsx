import { useContext, useEffect } from "react";
import React from "react";
import DriversItem from "./DriversItem";
import DriverService from "../../services/DriverService";
import DriverContext from "../../contexts/DriverContext";
import SearchDriver from "./SearchDriver";

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
      <div className="header-flex border-bottom border-dark pb-3">
        <h1>Drivers</h1>
        <SearchDriver />
      </div>
      <br />
      <section className="row">
        {getDriversJSX().map((driver, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-4 mb-4">
            <div className="card shadow-sm bg-body-tertiary rounded ;">
              <div className="card-body no-overflow">{driver}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DriversList;
