import { createContext, useState, useEffect, FC, ReactNode } from "react";
import { IDriver } from "../interfaces/IDriver";
import DriverService from "../services/DriverService";

// Definerer interfacet for konteksten, som beskriver hva konteksten vil inneholde
interface IDriverContext {
  drivers: IDriver[]; // Liste over drivere
  addDriver: (newDriver: IDriver) => void; // Funksjon for å legge til en ny driver
  searchDriverByName: (name: string) => void; // Funksjon for å søke etter drivere basert på navn
  searchTerm: string; // Søkeordet som brukes for filtrering
}

// Oppretter konteksten med en standardverdi av null
export const DriverContext = createContext<IDriverContext | null>(null);

// Definerer typen for props som Provider-komponenten vil akseptere
interface DriverProviderProps {
  children: ReactNode; // Barn-komponentene som vil bli innhyllet av Provider
}

// Provider-komponenten som gjør konteksten tilgjengelig for sine barn
export const DriverProvider: FC<DriverProviderProps> = ({ children }) => {
  const [drivers, setDrivers] = useState<IDriver[]>([]); // Tilstand for å holde på listen over drivere
  const [searchTerm, setSearchTerm] = useState(""); // Tilstand for å holde på søkeordet

  // useEffect for å hente drivere når komponenten monteres
  useEffect(() => {
    getDriversFromService();
  }, []);

  // Funksjon for å hente drivere fra en ekstern tjeneste
  const getDriversFromService = async () => {
    const driversFromService = await DriverService.getAllDrivers();
    if (driversFromService) {
      setDrivers(driversFromService);
    } else {
      setDrivers([]);
    }
  };

  // Funksjon for å legge til en ny driver i listen
  const addDriver = (newDriver: IDriver) => {
    setDrivers([...drivers, newDriver]);
  };

  // Funksjon for å filtrere drivere basert på søkeord
  const searchDriverByName = (name: string) => {
    setSearchTerm(name);
    if (name === "") {
      return drivers;
    } else {
      return drivers.filter((driver) =>
        driver.name.toLowerCase().includes(name.toLowerCase())
      );
    }
  };

  // Returnerer Provider-komponenten med kontekstverdier
  return (
    <DriverContext.Provider
      value={{ drivers, addDriver, searchDriverByName, searchTerm }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContext;
