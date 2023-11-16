import axios from "axios";
import { IDriver } from "../interfaces/IDriver";

const DriverService = (() => {
  const baseURL: string = "http://localhost:5008";
  const driverController: string = `${baseURL}/api/drivers`;

  const getBaseUrl = (): string => {
    return baseURL;
  };

  const getAllDrivers = async (): Promise<IDriver[]> => {
    try {
      const result = await axios.get(driverController);
      return result.data;
    } catch (err) {
      console.log("Ikke kontakt med driverController");
      return [];
    }
  };

  // Define the types for the parameters and return type for these functions
  const putDriver = async (): Promise<void> => {
    // Implementation
  };

  const postDriver = async (): Promise<void> => {
    // Implementation
  };

  const deleteDriver = async (): Promise<void> => {
    // Implementation
  };

  return {
    getAllDrivers,
    putDriver,
    postDriver,
    deleteDriver,
    getBaseUrl,
  };
})();

export default DriverService;
