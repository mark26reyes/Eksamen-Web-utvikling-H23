import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IDriver } from "../interfaces/IDriver";
import DriverService from "../services/DriverService";

interface DriverContextType {
  drivers: IDriver[];
  searchDriverByName: (name: string) => void;
  searchTerm: string;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

interface DriverProviderProps {
  children: ReactNode;
}

export const DriverProvider: React.FC<DriverProviderProps> = ({ children }) => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState<IDriver[]>([]);

  useEffect(() => {
    getDriversFromService();
  }, []);

  useEffect(() => {
    searchDriverByName(searchTerm);
  }, [drivers, searchTerm]);

  const getDriversFromService = async () => {
    const driversFromService = await DriverService.getAllDrivers();
    setDrivers(driversFromService);
  };

  const searchDriverByName = (name: string) => {
    setSearchTerm(name);
    if (name === "") {
      setFilteredDrivers(drivers);
    } else {
      const filtered = drivers.filter((driver) =>
        driver.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredDrivers(filtered);
    }
  };

  return (
    <DriverContext.Provider
      value={{ drivers: filteredDrivers, searchDriverByName, searchTerm }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContext;
