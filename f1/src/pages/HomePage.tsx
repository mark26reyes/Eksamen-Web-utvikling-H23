// Importerer useState og useEffect fra React
import { useState, useEffect } from "react";

// Importerer nødvendige komponenter og tjenester
import AddDrivers from "../components/drivers/AddDrivers";
import DeleteDriver from "../components/drivers/DeleteDriver";
import EditDriver from "../components/drivers/EditDriver";
import DriverService from "../services/DriverService";

// Funksjonell komponent som representerer hjemmesiden (HomePage)
const HomePage = () => {
  // Definerer en TypeScript-grensesnitt (interface) for sjåfører
  interface IDriver {
    id: number;
    name: string;
  }

  // Bruker useState-hook for å holde styr på tilstanden til sjåførene og den valgte sjåførens ID
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

  // Bruker useEffect-hook for å hente sjåførdata ved lasting av siden
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Henter alle sjåfører fra DriverService og oppdaterer tilstanden til sjåførene
        const allDrivers = await DriverService.getAllDrivers();
        setDrivers(allDrivers || []);
      } catch (error) {
        // Håndterer feil ved henting av sjåfører
        console.error("Error fetching drivers:", error);
      }
    };

    // Kaller fetchDrivers-funksjonen
    fetchDrivers();
  }, []); // Tomt avhengighetsarray betyr at denne effekten kun skal kjøres én gang ved komponentens montering

  // Returnerer JSX som representerer innholdet på hjemmesiden
  return (
    <>
      <img
        src="/public/f1-homepage-img.jpg"
        width={"100%"}
        alt="Bilde av redbull bil"
        className="img-fluid mt-5 mx-auto d-block"
      />
      {/* Container som inneholder innholdet på hjemmesiden */}
      <div className="container">
        <section className="row mt-5">
          <h3 className="border-bottom border-dark p-4 mb-4 f1-black-font fs-1">
            F1 Event
          </h3>
          {/* Legger til en sjåfør via AddDrivers-komponenten */}
          <AddDrivers />
          <img
            className="border-bottom border-dark col-lg-6 pt-5 pb-5 img-fluid"
            height={"450rem"}
            src="/public/max.jpg"
            alt="Image of Max Verstappen"
          />
          <br />
          {/* Dropdown-meny for å velge en sjåfør */}
          <label>
            <br />
            Select a Driver: <br />
            <select
              value={selectedDriverId?.toString() || ""}
              onChange={(e) => setSelectedDriverId(Number(e.target.value))}
            >
              <option value="" disabled>
                Choose a driver
              </option>
              {/* Mapper over sjåfører for å lage valgalternativer i dropdown-menyen */}
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </label>
          <img
            className="col-lg-6 pt-5 pb-5"
            src="/public/drivers.jpg"
            alt="Image og all F1 drivers"
          />
        </section>
        <br />
        {/* Viser EditDriver-komponenten hvis en sjåfør er valgt */}
        {selectedDriverId && <EditDriver driverId={selectedDriverId} />}
        <br />
        <br />
        {/* Viser DeleteDriver-komponenten hvis en sjåfør er valgt */}
        {selectedDriverId && <DeleteDriver driverId={selectedDriverId} />}
        <br />
        <br />
      </div>
    </>
  );
};

export default HomePage;
