import React, { useContext } from "react";
import DriversItem from "./DriversItem";
import DriverContext from "../../contexts/DriverContext";
import SearchDriver from "./SearchDriver";

// Viser en liste over F1-sjåfører.
const DriversList = () => {
  // Bruker konteksten til å hente en filtrert liste av sjåfører.
  const { filteredDrivers } = useContext(DriverContext);

  // Genererer JSX for hver sjåfør i den filtrerte listen.
  const getDriversJSX = () => {
    return filteredDrivers.map((driver, i) => (
      // Oppretter en DriversItem-komponent for hver sjåfør med nødvendige props.
      <DriversItem
        key={i}
        name={driver.name}
        age={driver.age}
        image={driver.image}
        nationality={driver.nationality}
      />
    ));
  };

  return (
    <div className="container">
      <div className="header-flex border-bottom border-dark pb-3">
        <h3 className="f1-black-font fs-1">F1 Drivers 2023</h3>
        <SearchDriver />
      </div>
      <br />

      <section className="row">
        {getDriversJSX().map((driver, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div>
              <div className="card-border card-body border-top border-end border-dark border-2 no-overflow p-3">
                {driver}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DriversList;
