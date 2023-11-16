import React, { createContext, useState, useContext, useEffect } from "react";
import RacesService from "../../services/RacesService";

const RacesContext = createContext();

export const RacesProvider = ({ children }) => {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    getAllRacesFromService();
  }, []);
  // Add functions to modify Races here
  const getAllRacesFromService = async () => {
    const racesFromService = await F1Service.getAllRaces();
    setRaces(racesFromService);
  };

  return (
    <RacesContext.Provider value={{ races }}>{children}</RacesContext.Provider>
  );
};

export default RacesContext;
