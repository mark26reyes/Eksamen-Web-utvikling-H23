import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import RacesService from "../services/RacesService";
import { IRaces } from "../interfaces/IRaces";

interface RacesContextType {
  races: IRaces[]; 
}

const RacesContext = createContext<RacesContextType | undefined>(undefined);

interface RacesProviderProps {
  children: ReactNode;
}

export const RacesProvider: React.FC<RacesProviderProps> = ({ children }) => {
  const [races, setRaces] = useState<IRaces[]>([]); 

  useEffect(() => {
    getAllRacesFromService();
  }, []);

  const getAllRacesFromService = async () => {
    const racesFromService = await RacesService.getAllRaces();
    setRaces(racesFromService);
  };

  return (
    <RacesContext.Provider value={{ races }}>{children}</RacesContext.Provider>
  );
};

export default RacesContext;
