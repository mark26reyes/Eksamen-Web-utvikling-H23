import React, { createContext, useState, useContext, useEffect } from "react";
import F1Service from "../services/F1Service";

const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeamsFromService();
  }, []);
  // Add functions to modify Teams here
  const getTeamsFromService = async () => {
    const teamsFromService = await F1Service.getAllTeams();
    setTeams(teamsFromService);
  };

  return (
    <TeamsContext.Provider value={{ teams }}>{children}</TeamsContext.Provider>
  );
};

export default TeamsContext;
