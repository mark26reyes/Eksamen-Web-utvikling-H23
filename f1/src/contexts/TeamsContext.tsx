import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import TeamsService from "../services/TeamsService";
import { ITeams } from "../interfaces/ITeams";

interface TeamsContextType {
  teams: any[]; // Replace 'any' with your Team type if available
}

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

interface TeamsProviderProps {
  children: ReactNode;
}

export const TeamsProvider: React.FC<TeamsProviderProps> = ({ children }) => {
  const [teams, setTeams] = useState<ITeams[]>([]); // Replace 'any' with your Team type if available

  useEffect(() => {
    getTeamsFromService();
  }, []);

  const getTeamsFromService = async () => {
    const teamsFromService = await TeamsService.getAllTeams();
    setTeams(teamsFromService);
  };

  return (
    <TeamsContext.Provider value={{ teams }}>{children}</TeamsContext.Provider>
  );
};

export default TeamsContext;
