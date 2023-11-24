// Importerer axios for å gjøre HTTP-forespørsler og IDriver-grensesnittet for å definere driverobjektet
import axios from "axios";
import { IDriver } from "../interfaces/IDriver";

// En IIFE (Immediately Invoked Function Expression) som returnerer et objekt med metoder for å håndtere drivere
const DriverService = (() => {
  // Definerer base URL for API-en og de nødvendige kontrollerne
  const baseURL: string = "http://localhost:5008";
  const driverController: string = `${baseURL}/api/drivers`;
  const imageUploadController = `${baseURL}/api/imageUpload`;

  // Metode som returnerer base-URL-en for andre deler av applikasjonen
  const getBaseUrl = (): string => {
    return baseURL;
  };

  // Metode for å hente alle drivere fra API-en
  const getAllDrivers = async (): Promise<IDriver[] | null> => {
    try {
      const result = await axios.get(driverController);
      return result.data;
    } catch (err) {
      console.error("Could not fetch drivers:", err);
      return null;
    }
  };

  // Metode for å hente en enkelt sjåfør basert på ID fra API-en
  const getDriverById = async (id: number): Promise<IDriver | null> => {
    try {
      const result = await axios.get(`${driverController}/${id}`);
      return result.data;
    } catch (err) {
      console.error(`Could not fetch driver with ID ${id}:`, err);
      return null;
    }
  };

  // Metode for å oppdatere en sjåfør i API-en basert på ID
  const putDriver = async (
    id: number,
    updatedDriver: IDriver
  ): Promise<void> => {
    try {
      await axios.put(`${driverController}/${id}`, updatedDriver);
    } catch (err) {
      console.error(`Error updating driver with ID ${id}:`, err);
      throw err;
    }
  };

  // Metode for å legge til en ny sjåfør i API-en
  const postDriver = async (newDriver: IDriver, image: File): Promise<void> => {
    try {
      // Legger til sjåføren i API-en
      const result = await axios.post(driverController, newDriver);
      console.log("Driver posted successfully:", result.data);

      // Oppretter et nytt filnavn basert på sjåførens navn
      const newImageName = `${newDriver.name.replace(/\s+/g, "_")}.png`;
      const newImageFile = new File([image], newImageName, {
        type: image.type,
      });

      // Oppretter en FormData for å sende bildet til serveren
      const formData = new FormData();
      formData.append("formFile", newImageFile);

      // Sender bildet til API-en for opplasting
      const uploadResult = await axios({
        url: imageUploadController,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Image uploaded successfully:", uploadResult.data);

      // Fjerner bildet fra FormData
      formData.delete("formFile");
    } catch (error) {
      console.error("Error in postDriver:", error);
      throw error;
    }
  };

  // Metode for å slette en sjåfør basert på ID fra API-en
  const deleteDriver = async (id: number): Promise<void> => {
    try {
      // Henter informasjon om sjåføren før sletting
      const driverToDelete = await axios.get(`${driverController}/${id}`);

      // Sletter sjåføren fra API-en
      await axios.delete(`${driverController}/${id}`);

      // Hvis sjåføren hadde et bilde, slettes bildet også
      if (driverToDelete.data.imageName) {
        await axios.delete(
          `${imageUploadController}/${driverToDelete.data.imageName}`
        );
      }
    } catch (err) {
      console.error(`Error deleting driver with ID ${id}:`, err);
      throw err;
    }
  };

  // Returnerer et objekt med de ulike metodene
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
