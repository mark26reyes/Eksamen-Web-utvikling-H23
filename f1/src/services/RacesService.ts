// Importerer axios for å gjøre HTTP-forespørsler og IRaces-grensesnittet for å representere løpsdata
import axios from "axios";
import { IRaces } from "../interfaces/IRaces";

// En IIFE (Immediately Invoked Function Expression) som returnerer et objekt med metoder for å hente løpsrelaterte data fra API-en
const RacesService = (() => {
  // Definerer base-URL og kontroller for API-forespørsler
  const baseURL: string = "http://localhost:5008";
  const racesController: string = `${baseURL}/api/races`;

  // Metode for å hente base-URL-en
  const getBaseUrl = (): string => {
    return baseURL;
  };

  // Metode for å hente alle løp fra API-en
  const getAllRaces = async (): Promise<IRaces[]> => {
    try {
      const result = await axios.get(racesController);
      return result.data;
    } catch (err) {
      // Håndtering av feil: Skriver ut en feilmelding til konsollen og returnerer en tom liste
      console.error("Ikke kontakt med racesController");
      return [];
    }
  };

  // Returnerer et objekt med de ulike metodene for å hente løpsdata
  return {
    getAllRaces,
    getBaseUrl,
  };
})();

export default RacesService;
