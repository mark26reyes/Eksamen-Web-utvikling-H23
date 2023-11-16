import axios from "axios";
import { IRaces } from "../interfaces/IRaces";

const RacesService = (() => {
  const baseURL: string = "http://localhost:5008";
  const racesController: string = `${baseURL}/api/races`;

  const getBaseUrl = (): string => {
    return baseURL;
  };

  const getAllRaces = async (): Promise<IRaces[]> => {
    try {
      const result = await axios.get(racesController);
      return result.data;
    } catch (err) {
      console.error("Ikke kontakt med racesController");
      return [];
    }
  };

  return {
    getAllRaces,
    getBaseUrl,
  };
})();

export default RacesService;
