import React, { createContext, useState, useContext, useEffect } from "react";
import F1Service from "../services/F1Service";

const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getDriversFromService();
  }, []);
  // Add functions to modify drivers here
  const getDriversFromService = async () => {
    const driversFromService = await F1Service.getAll();
    setDrivers(driversFromService);
  };

  return (
    <DriverContext.Provider value={{ drivers }}>
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContext;
