import axios from "axios";
import { ITeams } from "../interfaces/ITeams";

const TeamsService = (() => {
  const baseURL: string = "http://localhost:5008";
  const teamsController: string = `${baseURL}/api/teams`;

  const getBaseUrl = (): string => {
    return baseURL;
  };

  const getAllTeams = async (): Promise<ITeams[]> => {
    try {
      const result = await axios.get(teamsController);
      return result.data;
    } catch (err) {
      console.error("Ikke kontakt med teamsController");
      return [];
    }
  };

  return {
    getAllTeams,
    getBaseUrl,
  };
})();

export default TeamsService;
