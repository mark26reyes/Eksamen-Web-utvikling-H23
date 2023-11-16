import React, { createContext, useState, useContext, useEffect } from "react";
import DriverService from "../services/DriverService";

const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getDriversFromService();
  }, []);
  // Add functions to modify drivers here
  const getDriversFromService = async () => {
    const driversFromService = await F1Service.getAllDrivers();
    setDrivers(driversFromService);
  };

  return (
    <DriverContext.Provider value={{ drivers }}>
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContext;
