import React, { createContext, useState, useContext, useEffect } from "react";
import TeamsService from "../services/TeamsService";

const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeamsFromService();
  }, []);
  // Add functions to modify Teams here
  const getTeamsFromService = async () => {
    const teamsFromService = await TeamsService.getAllTeams();
    setTeams(teamsFromService);
  };

  return (
    <TeamsContext.Provider value={{ teams }}>{children}</TeamsContext.Provider>
  );
};

export default TeamsContext;
