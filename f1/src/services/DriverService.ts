import axios from "axios";
import { IDriver } from "../interfaces/IDriver";

const DriverService = (() => {
  const baseURL: string = "http://localhost:5008";
  const driverController: string = `${baseURL}/api/drivers`;

  const getBaseUrl = (): string => {
    return baseURL;
  };

  const getAllDrivers = async (): Promise<IDriver[] | null> => {
    try {
      const result = await axios.get(driverController);
      return result.data;
    } catch (err) {
      console.error("Could not fetch drivers:", err);
      return null;
    }
  };

  const getDriverById = async (id: number): Promise<IDriver | null> => {
    try {
      const result = await axios.get(`${driverController}/${id}`);
      return result.data;
    } catch (err) {
      console.error(`Could not fetch driver with ID ${id}:`, err);
      return null;
    }
  };

  const putDriver = async (
    id: number,
    updatedDriver: IDriver
  ): Promise<void> => {
    try {
      await axios.put(`${driverController}/${id}`, updatedDriver);
    } catch (err) {
      console.error(`Error updating driver with ID ${id}:`, err);
      throw err; // Rethrow the error for the calling code to handle
    }
  };

  const postDriver = async (newDriver: IDriver): Promise<void> => {
    try {
      await axios.post(driverController, newDriver);
    } catch (err) {
      console.error("Error creating a new driver:", err);
      throw err; // Rethrow the error for the calling code to handle
    }
  };

  const deleteDriver = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${driverController}/${id}`);
    } catch (err) {
      console.error(`Error deleting driver with ID ${id}:`, err);
      throw err; // Rethrow the error for the calling code to handle
    }
  };

  return {
    getAllDrivers,
    getDriverById,
    putDriver,
    postDriver,
    deleteDriver,
    getBaseUrl,
  };
})();

export default DriverService;
