import axios from "axios";

const RacesService = (() => {
  const baseURL = "http://localhost:5008";
  const racesController = `${baseURL}/api/races`;

  const getBaseUrl = () => {
    return baseURL;
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


  return {
    getAllRaces,
    getBaseUrl,
  };
})();

export default RacesService;
