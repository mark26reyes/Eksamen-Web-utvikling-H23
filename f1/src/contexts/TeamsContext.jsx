import React, { createContext, useState, useContext } from "react";

const TeamContext = createContext();

export const useTeams = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  // Add functions to modify teams here

  return (
    <TeamContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamContext.Provider>
  );
};
