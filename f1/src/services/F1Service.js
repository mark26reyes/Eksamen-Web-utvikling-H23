import axios from "axios";

const F1Service = (() => {
  const baseURL = "http://localhost:5008";
  const driverController = `${baseURL}/api/drivers`;
  const teamsController = `${baseURL}/api/teams`;
  const racesController = `${baseURL}/api/races`;

  const getBaseUrl = () => {
    return baseURL;
  };

  const getAll = async () => {
    try {
      const result = await axios.get(driverController);
      return result.data;
    } catch (err) {
      console.log("Ikke kontakt med driverController");
      return [];
    }
  };

  const getAllRaces = async () => {
    try {
      const result = await axios.get(racesController);
      return result.data;
    } catch (err) {
      console.log("Ikke kontakt med racesController");
      return [];
    }
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

  const putDriver = async () => {};

  const postDriver = async () => {};

  return {
    getAll,
    putDriver,
    postDriver,
    getAllRaces,
    getAllTeams,
    getBaseUrl,
  };
})();

export default F1Service;
