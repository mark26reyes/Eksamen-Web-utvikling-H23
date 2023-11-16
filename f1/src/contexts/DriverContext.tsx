import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { IDriver } from "../interfaces/IDriver";
import DriverService from "../services/DriverService";

interface DriverContextType {
  drivers: any[]; // Replace 'any' with your Driver type if available
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

interface DriverProviderProps {
  children: ReactNode;
}

export const DriverProvider: React.FC<DriverProviderProps> = ({ children }) => {
  const [drivers, setDrivers] = useState<IDriver[]>([]); // Replace 'any' with your Driver type if available

  useEffect(() => {
    getDriversFromService();
  }, []);

  const getDriversFromService = async () => {
    const driversFromService = await DriverService.getAllDrivers();
    setDrivers(driversFromService);
  };

  return (
    <DriverContext.Provider value={{ drivers }}>
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContext;
