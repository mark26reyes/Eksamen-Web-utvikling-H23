import React, { createContext, useState, useContext } from "react";

const RaceContext = createContext();

export const useRaces = () => useContext(RaceContext);

export const RaceProvider = ({ children }) => {
  const [races, setRaces] = useState([]);

  // Add functions to modify races here

  return (
    <RaceContext.Provider value={{ races, setRaces }}>
      {children}
    </RaceContext.Provider>
  );
};
