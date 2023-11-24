// Importerer axios for å gjøre HTTP-forespørsler
import axios from "axios";

// En IIFE (Immediately Invoked Function Expression) som returnerer et objekt med metoder for å hente quiz-relaterte data fra API-en
const QuizService = (() => {
  // Definerer base-URL og kontroller for API-forespørsler
  const baseURL = "http://localhost:5008"; // Bytt ut med den faktiske API-URL-en
  const driversController = `${baseURL}/api/drivers`;
  const racesController = `${baseURL}/api/races`;
  const teamsController = `${baseURL}/api/teams`;

  // Metode for å hente alle drivere fra API-en
  const getAllDrivers = async () => {
    try {
      const result = await axios.get(driversController);
      return result.data;
    } catch (err) {
      console.error("Could not fetch drivers:", err);
      return null;
    }
  };

  // Metode for å hente alle løp fra API-en
  const getAllRaces = async () => {
    try {
      const result = await axios.get(racesController);
      return result.data;
    } catch (err) {
      console.error("Could not fetch races:", err);
      return null;
    }
  };

  // Metode for å hente alle lag fra API-en
  const getAllTeams = async () => {
    try {
      const result = await axios.get(teamsController);
      return result.data;
    } catch (err) {
      console.error("Could not fetch teams:", err);
      return null;
    }
  };

  // Returnerer et objekt med de ulike metodene for å hente data
  return {
    getAllDrivers,
    getAllRaces,
    getAllTeams,
  };
})();

export default QuizService;
