import React, { createContext, useState, useEffect, ReactNode } from "react";
import RacesService from "../services/RacesService";
import { IRaces } from "../interfaces/IRaces";

// Definisjon av typer for kontekstverdiene
interface RacesContextType {
  races: IRaces[];
  filteredRaces: IRaces[];
  searchTerm: string;
  searchRaceByGrandPrix: (grandPrix: string) => void;
}

// Opprettelse av en kontekst for løp med startverdi undefined
const RacesContext = createContext<RacesContextType | undefined>(undefined);

// Propstyper for RacesProvider-komponenten
interface RacesProviderProps {
  children: ReactNode;
}

// Provider-komponent for løp som gir tilgang til kontekstverdier for komponentene i treet
export const RacesProvider: React.FC<RacesProviderProps> = ({ children }) => {
  // Tilstand (state) for alle løp, filtrerte løp og søkebegrepet
  const [races, setRaces] = useState<IRaces[]>([]);
  const [filteredRaces, setFilteredRaces] = useState<IRaces[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Effekt som kjører når komponenten monteres
  useEffect(() => {
    getAllRacesFromService();
  }, []);

  // Henter alle løp fra tjenesten ved hjelp av RacesService
  const getAllRacesFromService = async () => {
    const racesFromService = await RacesService.getAllRaces();
    setRaces(racesFromService);
    setFilteredRaces(racesFromService); // Initierer filteredRaces med alle løp i starten
  };

  // Søkefunksjon for å filtrere løp basert på Grand Prix-navn
  const searchRaceByGrandPrix = (grandPrix: string) => {
    setSearchTerm(grandPrix);

    if (grandPrix === "") {
      setFilteredRaces(races);
    } else {
      // Filtrerer løp basert på Grand Prix-navn og oppdaterer filteredRaces
      const filtered = races.filter((race) =>
        race.grandPrix.toLowerCase().includes(grandPrix.toLowerCase())
      );
      setFilteredRaces(filtered);
    }
  };

  // Returnerer Provider-komponenten for løp med kontekstverdier
  return (
    <RacesContext.Provider
      value={{ races, filteredRaces, searchTerm, searchRaceByGrandPrix }}
    >
      {children}
    </RacesContext.Provider>
  );
};

export default RacesContext;
