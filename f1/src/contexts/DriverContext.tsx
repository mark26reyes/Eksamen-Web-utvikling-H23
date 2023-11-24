import { createContext, useState, useEffect, FC, ReactNode } from "react";
import { IDriver } from "../interfaces/IDriver";
import DriverService from "../services/DriverService";

// Definerer interfacet for DriverContext.
interface IDriverContext {
  drivers: IDriver[]; // Fullstendig liste over sjåfører.
  filteredDrivers: IDriver[]; // Filtrert liste basert på søkeord.
  addDriver: (newDriver: IDriver) => void; // Legger til en ny sjåfør.
  searchDriverByName: (name: string) => void; // Søker etter sjåfører basert på navn.
  searchTerm: string;
}

// Oppretter en React Context for å dele data om sjåfører.
export const DriverContext = createContext<IDriverContext | null>(null);

// Definerer typen for props i DriverProvider-komponenten.
interface DriverProviderProps {
  children: ReactNode;
}

// Provider-komponenten for DriverContext.
export const DriverProvider: FC<DriverProviderProps> = ({ children }) => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<IDriver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Henter sjåførdata
  useEffect(() => {
    getDriversFromService();
  }, []);

  // Async funksjon for å hente sjåførdata.
  const getDriversFromService = async () => {
    const driversFromService = await DriverService.getAllDrivers();
    setDrivers(driversFromService || []);
    setFilteredDrivers(driversFromService || []);
  };

  // Legger til en ny sjåfør i listen.
  const addDriver = (newDriver: IDriver) => {
    setDrivers([...drivers, newDriver]);
    setFilteredDrivers([...drivers, newDriver]);
  };

  // Søker etter sjåfører basert på gitt navn.
  const searchDriverByName = (name: string) => {
    setSearchTerm(name);
    if (name === "") {
      setFilteredDrivers(drivers); // Nullstiller filtrerte sjåfører hvis søkeordet er tomt.
    } else {
      const filtered = drivers.filter((driver) =>
        driver.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredDrivers(filtered); // Oppdaterer filtrerte sjåfører basert på søkeord.
    }
  };

  // Returnerer Provider-komponent
  return (
    <DriverContext.Provider
      value={{
        drivers,
        filteredDrivers,
        addDriver,
        searchDriverByName,
        searchTerm,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContext;
