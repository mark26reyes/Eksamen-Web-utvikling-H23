import axios from "axios";
import { IDriver } from "../interfaces/IDriver";

const DriverService = (() => {
  const baseURL: string = "http://localhost:5008";
  const driverController: string = `${baseURL}/api/drivers`;
  const imageUploadController = `${baseURL}/api/imageUpload`;

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

  const postDriver = async (newDriver: IDriver, image: File): Promise<void> => {
    try {
      const result = await axios.post(driverController, newDriver);
      console.log("Driver posted successfully:", result.data);

      // Renaming the image file
      const newImageName = `${newDriver.name.replace(/\s+/g, "_")}.png`;
      const newImageFile = new File([image], newImageName, {
        type: image.type,
      });

      const formData = new FormData();
      formData.append("formFile", newImageFile);

      const uploadResult = await axios({
        url: imageUploadController,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Image uploaded successfully:", uploadResult.data);

      formData.delete("formFile");
    } catch (error) {
      console.error("Error in postDriver:", error);
      throw error;
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
