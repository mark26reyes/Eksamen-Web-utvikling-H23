import axios from "axios";

const DriverService = (() => {
  const baseURL = "http://localhost:5008";
  const driverController = `${baseURL}/api/drivers`;

  const getBaseUrl = () => {
    return baseURL;
  };

  const getAllDrivers = async () => {
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

  const deleteDriver = async () => {};

  return {
    getAllDrivers,
    putDriver,
    postDriver,
    getBaseUrl,
  };
})();

export default DriverService;
