import React, { useState } from "react";
import DriverService from "../../services/DriverService";

function AddDriver() {
  // State-variabler for å holde styr på input-feltene og bilde
  const [driverName, setDriverName] = useState("");
  const [driverAge, setDriverAge] = useState("");
  const [driverNationality, setDriverNationality] = useState("");
  const [image, setImage] = useState(null);

  // Event handler for endringer i input-feltene
  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case "name":
        setDriverName(e.currentTarget.value);
        break;
      case "age":
        setDriverAge(e.currentTarget.value);
        break;
      case "nationality":
        setDriverNationality(e.currentTarget.value);
        break;
      case "image":
        // Lagrer det valgte bildet
        setImage(e.currentTarget.files[0]);
        break;
    }
  };

  // Event handler for skjemainnsending
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lager bilde-URL basert på sjåførens navn
    const imageUrl = `/images/drivers/${driverName}.png`;

    // Lager et objekt med sjåførens informasjon
    const newDriver = {
      name: driverName,
      age: driverAge,
      nationality: driverNationality,
      image: imageUrl,
    };

    // Sender informasjonen til tjenesten for å legge til en ny sjåfør
    await DriverService.postDriver(newDriver, image);

    // Nullstiller input-feltene etter innsending
    setDriverName("");
    setDriverAge("");
    setDriverNationality("");

    // Omlaster siden for å vise oppdatert liste over sjåfører
    window.location.href = "/drivers";
  };

  // JSX for komponenten
  return (
    <section className="border-bottom border-dark pb-5 w-50">
      <h3 className="pb-4">Register as a new driver</h3>
      <form onSubmit={handleSubmit}>
        {/* Input-felt for sjåførens navn */}
        <label className="d-flex flex-column w-50">
          Name:{" "}
          <input
            name="name"
            onChange={handleChange}
            type="text"
            value={driverName}
            placeholder="Enter name..."
          />
        </label>
        <br />

        {/* Input-felt for sjåførens alder */}
        <label className="d-flex flex-column w-50">
          Age:{" "}
          <input
            name="age"
            onChange={handleChange}
            type="text"
            value={driverAge}
            placeholder="Enter age..."
          />
        </label>
        <br />

        {/* Input-felt for sjåførens nasjonalitet */}
        <label className="d-flex flex-column w-50">
          Nationality:{" "}
          <input
            name="nationality"
            onChange={handleChange}
            type="text"
            value={driverNationality}
            placeholder="Enter nationality..."
          />
        </label>
        <br />

        {/* Input-felt for å velge bilde av sjåføren */}
        <label className="d-flex flex-column">
          Image:
          <input name="image" onChange={handleChange} type="file" />
          PS: The image needs to be saved as a PNG file.
        </label>
        <br />

        {/* Knapp for å legge til ny sjåfør */}
        <button className="btn bg-dark text-light rounded" type="submit">
          Add driver
        </button>
      </form>
    </section>
  );
}

export default AddDriver;
