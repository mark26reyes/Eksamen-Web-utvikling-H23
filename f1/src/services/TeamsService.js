import axios from "axios";

const TeamsService = (() => {
  const baseURL = "http://localhost:5008";

  const teamsController = `${baseURL}/api/teams`;

  const getBaseUrl = () => {
    return baseURL;
  };

  const getAllTeams = async () => {
    try {
      const result = await axios.get(teamsController);
      return result.data;
    } catch (err) {
      console.log("Ikke kontakt med teamsController");
      return [];
    }
  };

  return {
    getAllTeams,
    getBaseUrl,
  };
})();

export default TeamsService;
