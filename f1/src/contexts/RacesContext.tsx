import React, { createContext, useState, useEffect, ReactNode } from "react";
import RacesService from "../services/RacesService";
import { IRaces } from "../interfaces/IRaces";

interface RacesContextType {
  races: IRaces[];
  filteredRaces: IRaces[];
  searchTerm: string;
  searchRaceByGrandPrix: (grandPrix: string) => void;
}

const RacesContext = createContext<RacesContextType | undefined>(undefined);

interface RacesProviderProps {
  children: ReactNode;
}

export const RacesProvider: React.FC<RacesProviderProps> = ({ children }) => {
  const [races, setRaces] = useState<IRaces[]>([]);
  const [filteredRaces, setFilteredRaces] = useState<IRaces[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllRacesFromService();
  }, []);

  const getAllRacesFromService = async () => {
    const racesFromService = await RacesService.getAllRaces();
    setRaces(racesFromService);
    setFilteredRaces(racesFromService); // Initially, filteredRaces is the same as all races
  };

  const searchRaceByGrandPrix = (grandPrix: string) => {
    setSearchTerm(grandPrix);

    if (grandPrix === "") {
      setFilteredRaces(races);
    } else {
      const filtered = races.filter((race) =>
        race.grandPrix.toLowerCase().includes(grandPrix.toLowerCase())
      );
      setFilteredRaces(filtered);
    }
  };

  return (
    <RacesContext.Provider
      value={{ races, filteredRaces, searchTerm, searchRaceByGrandPrix }}
    >
      {children}
    </RacesContext.Provider>
  );
};

export default RacesContext;
