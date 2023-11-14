import React, { createContext, useState, useContext } from "react";

const DriverContext = createContext();

export const useDrivers = () => useContext(DriverContext);

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);

  // Add functions to modify drivers here
  const getDriversFromService = async () => {};

  return (
    <DriverContext.Provider value={{ drivers, setDrivers }}>
      {children}
    </DriverContext.Provider>
  );
};
