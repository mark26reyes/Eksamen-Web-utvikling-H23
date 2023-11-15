import axios from "axios";

const F1Service = (() => {
  const driverController = "http://localhost:5008/api/drivers";
  const teamsController = "http://localhost:5008/api/teams";
  const racesController = "http://localhost:5008/api/races";
  const quizController = "";

  const getAll = async () => {
    try {
      const result = await axios.get(driverController);
      return result.data;
    } catch (err) {
      console.log("Ikke kontakt med driverController");
      return [];
    }
  };

  const putDriver = async () => {};

  const postDriver = async () => {};

  return {
    getAll,
    putDriver,
    postDriver,
  };
})();

export default F1Service;
