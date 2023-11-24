import React, { useState, useEffect } from "react";
import DriverService from "../../services/DriverService";

function DeleteDriver({ driverId }) {
  // State-variabel for å holde sjåførdata
  const [driver, setDriver] = useState(null);

  // useEffect brukes til å hente sjåførdata når komponenten lastes
  useEffect(() => {
    // Definerer en asynkron funksjon for å hente sjåførdata
    const fetchDriver = async () => {
      try {
        // Henter sjåførdata ved hjelp av DriverService basert på ID-en
        const fetchedDriver = await DriverService.getDriverById(driverId);

        // Oppdaterer state med sjåførdata
        setDriver(fetchedDriver);
      } catch (error) {
        // Håndterer feil ved henting av sjåførdata
        console.error("Error fetching driver:", error);
      }
    };

    // Kaller fetchDriver-funksjonen når komponenten lastes og når driverId endres
    fetchDriver();
  }, [driverId]);

  // Event handler for sletting av sjåfør
  const handleDelete = async () => {
    try {
      // Sjekker om driver-objektet og driverens ID er gyldige
      if (driver && driver.id) {
        // Kaller DriverService for å slette sjåføren basert på ID
        await DriverService.deleteDriver(driver.id);

        // Omlaster siden etter vellykket sletting
        window.location.href = "/drivers";
      } else {
        // Logger feilmelding hvis sjåfør eller sjåfør-ID er ugyldig
        console.error("Driver or driver ID is invalid.");
      }
    } catch (error) {
      // Håndterer feil ved sletting av sjåfør
      console.error("Error deleting driver:", error);
    }
  };

  // Hvis sjåførdata ikke er lastet ennå, vises en ladeindikator
  if (!driver) {
    return <div>Loading...</div>;
  }

  // JSX som viser informasjon om sjåføren og knapp for sletting
  return (
    <section className="w-50">
      <h2>Delete Driver</h2>
      <p>Are you sure you want to delete the driver: {driver.name || "N/A"}?</p>
      <button
        onClick={handleDelete}
        className="btn bg-dark text-light rounded"
        type="submit"
      >
        Yes, delete driver
      </button>
    </section>
  );
}

export default DeleteDriver;
