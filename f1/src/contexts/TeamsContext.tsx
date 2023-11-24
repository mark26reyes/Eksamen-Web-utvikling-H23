import React, { createContext, useState, useEffect, ReactNode } from "react";
import TeamsService from "../services/TeamsService";
import { ITeams } from "../interfaces/ITeams";

// Definisjon av typer for kontekstverdien
interface TeamsContextType {
  teams: ITeams[]; // Erstatt 'any' med din Team-type hvis tilgjengelig
}

// Opprettelse av en kontekst for lag med startverdi undefined
const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

// Propstyper for TeamsProvider-komponenten
interface TeamsProviderProps {
  children: ReactNode;
}

// Provider-komponent for lag som gir tilgang til kontekstverdier for komponentene i treet
export const TeamsProvider: React.FC<TeamsProviderProps> = ({ children }) => {
  // Tilstand (state) for alle lag
  const [teams, setTeams] = useState<ITeams[]>([]); // Erstatt 'any' med din Team-type hvis tilgjengelig

  // Effekt som kjører når komponenten monteres
  useEffect(() => {
    getTeamsFromService();
  }, []);

  // Henter alle lag fra tjenesten ved hjelp av TeamsService
  const getTeamsFromService = async () => {
    const teamsFromService = await TeamsService.getAllTeams();
    setTeams(teamsFromService);
  };

  // Returnerer Provider-komponenten for lag med kontekstverdier
  return (
    <TeamsContext.Provider value={{ teams }}>{children}</TeamsContext.Provider>
  );
};

export default TeamsContext;
