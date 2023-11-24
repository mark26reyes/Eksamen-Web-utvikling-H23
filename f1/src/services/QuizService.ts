import axios from "axios";

const QuizService = (() => {
  const baseURL = "http://localhost:5008"; // Replace with your actual API URL
  const driversController = `${baseURL}/api/drivers`;
  const racesController = `${baseURL}/api/races`;
  const teamsController = `${baseURL}/api/teams`;

  const getAllDrivers = async () => {
    try {
      const result = await axios.get(driversController);
      return result.data;
    } catch (err) {
      console.error("Could not fetch drivers:", err);
      return null;
    }
  };

  const getAllRaces = async () => {
    try {
      const result = await axios.get(racesController);
      return result.data;
    } catch (err) {
      console.error("Could not fetch races:", err);
      return null;
    }
  };

  const getAllTeams = async () => {
    try {
      const result = await axios.get(teamsController);
      return result.data;
    } catch (err) {
      console.error("Could not fetch teams:", err);
      return null;
    }
  };

  return {
    getAllDrivers,
    getAllRaces,
    getAllTeams,
  };
})();

export default QuizService;
