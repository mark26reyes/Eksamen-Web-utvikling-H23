import React, { useState, useEffect } from "react";
import DriverService from "../../services/DriverService";

// Funksjonell komponent for å redigere sjåførdata
function EditDriver({ driverId }) {
  // State-variabler for å holde sjåførdata og oppdaterte verdier
  const [driver, setDriver] = useState(null);
  const [updatedDriverName, setUpdatedDriverName] = useState("");
  const [updatedDriverAge, setUpdatedDriverAge] = useState("");
  const [updatedDriverNationality, setUpdatedDriverNationality] = useState("");
  const [updatedDriverImage, setUpdatedDriverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Effekt som kjører når komponenten lastes
  useEffect(() => {
    const fetchDriver = async () => {
      if (driverId) {
        try {
          // Henter sjåførdata basert på ID fra DriverService
          const fetchedDriver = await DriverService.getDriverById(driverId);

          // Oppdaterer state med sjåførdata og de oppdaterte verdiene
          setDriver(fetchedDriver);
          setUpdatedDriverName(fetchedDriver?.name || "");
          setUpdatedDriverAge(fetchedDriver?.age || "");
          setUpdatedDriverNationality(fetchedDriver?.nationality || "");
          setUpdatedDriverImage(fetchedDriver?.image || null);
        } catch (error) {
          // Håndterer feil ved henting av sjåførdata
          console.error("Error fetching driver:", error);
        }
      }
    };

    // Kaller fetchDriver-funksjonen når komponenten lastes og når driverId endres
    fetchDriver();
  }, [driverId]);

  // Event handler for å oppdatere sjåførdata
  const handleUpdate = async () => {
    try {
      // Sjekker om driver-objektet og driverens ID er gyldige
      if (driver && driver.id) {
        // Oppretter et oppdatert sjåfør-objekt med de nye verdiene
        const updatedDriver = {
          ...driver,
          name: updatedDriverName,
          age: updatedDriverAge,
          nationality: updatedDriverNationality,
          image: updatedDriverImage,
        };

        // Kaller DriverService for å oppdatere sjåføren basert på ID
        await DriverService.putDriver(driver.id, updatedDriver);

        // Omlaster siden etter vellykket oppdatering
        window.location.href = "/drivers";
      } else {
        // Logger feilmelding hvis sjåfør eller sjåfør-ID er ugyldig
        console.error("Driver or driver ID is invalid.");
      }
    } catch (error) {
      // Håndterer feil ved oppdatering av sjåfør
      console.error("Error updating driver:", error);
    }
  };

  // Event handler for endringer i bildet
  const handleChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      // Oppdaterer state med det valgte bildet
      setUpdatedDriverImage(selectedImage);

      // Oppretter en FileReader for å lese bildedata og generere en forhåndsvisning
      const reader = new FileReader();
      reader.onloadend = () => {
        // Oppdaterer state med forhåndsvisningens URL
        setImagePreview(reader.result);
      };

      // Leser bildedata som en data-URL
      reader.readAsDataURL(selectedImage);
    }
  };

  // Hvis sjåførdata ikke er lastet ennå, vises en ladeindikator
  if (!driver) {
    return <div>Loading...</div>;
  }

  // JSX som viser informasjon om sjåføren og skjema for redigering
  return (
    <section className="border-bottom border-dark pb-5 w-50">
      <h2>Edit Driver</h2>
      {driver && (
        <>
          {/* Viser eksisterende informasjon om sjåføren */}
          <p>Name: {driver.name || "N/A"}</p>
          <p>Age: {driver.age || "N/A"}</p>
          <p>Nationality: {driver.nationality || "N/A"}</p>

          {/* Skjema for oppdatering av sjåførdata */}
          <label className="d-flex flex-column w-50">
            Updated Name:
            <input
              type="text"
              value={updatedDriverName}
              onChange={(e) => setUpdatedDriverName(e.target.value)}
            />
          </label>
          <br />

          <label className="d-flex flex-column w-50">
            Updated Age:
            <input
              type="text"
              value={updatedDriverAge}
              onChange={(e) => setUpdatedDriverAge(e.target.value)}
            />
          </label>
          <br />

          <label className="d-flex flex-column w-50">
            Updated Nationality:
            <input
              type="text"
              value={updatedDriverNationality}
              onChange={(e) => setUpdatedDriverNationality(e.target.value)}
            />
          </label>
          <br />

          {/* Input for å velge et nytt bilde */}
          <label className="d-flex flex-column">
            Updated Image:
            <input name="image" onChange={handleChange} type="file" />
            {/* Viser forhåndsvisning av det valgte bildet */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </label>
          <br />

          {/* Knapp for å oppdatere sjåførdata */}
          <button
            onClick={handleUpdate}
            className="btn bg-dark text-light rounded"
            type="submit"
          >
            Update driver
          </button>
        </>
      )}
    </section>
  );
}

export default EditDriver;
