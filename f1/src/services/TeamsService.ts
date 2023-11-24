// Importerer axios for å gjøre HTTP-forespørsler og ITeams-grensesnittet for å representere lagdata
import axios from "axios";
import { ITeams } from "../interfaces/ITeams";

// En IIFE (Immediately Invoked Function Expression) som returnerer et objekt med metoder for å hente lagrelaterte data fra API-en
const TeamsService = (() => {
  // Definerer base-URL og kontroller for API-forespørsler
  const baseURL: string = "http://localhost:5008";
  const teamsController: string = `${baseURL}/api/teams`;

  // Metode for å hente base-URL-en
  const getBaseUrl = (): string => {
    return baseURL;
  };

  // Metode for å hente alle lag fra API-en
  const getAllTeams = async (): Promise<ITeams[]> => {
    try {
      const result = await axios.get(teamsController);
      return result.data;
    } catch (err) {
      // Håndtering av feil: Skriver ut en feilmelding til konsollen og returnerer en tom liste
      console.error("Ikke kontakt med teamsController");
      return [];
    }
  };

  // Returnerer et objekt med de ulike metodene for å hente lagdata
  return {
    getAllTeams,
    getBaseUrl,
  };
})();

export default TeamsService;
