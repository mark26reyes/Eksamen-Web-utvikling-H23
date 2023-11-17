import React, { useState } from "react";
import DriverService from "../../services/DriverService";

function AddDriver() {
  const [driverName, setDriverName] = useState("");
  const [driverAge, setDriverAge] = useState("");
  const [driverNationality, setDriverNationality] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDriver = {
      name: driverName,
      age: driverAge,
      nationality: driverNationality,
    };

    await DriverService.postDriver(newDriver);

    // Clear form fields after submission
    setDriverName("");
    setDriverAge(0);
    setDriverNationality("");
  };

  return (
    <section>
      <h2>Register as a new driver</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Age:
          <input
            type="text"
            value={driverAge}
            onChange={(e) => setDriverAge(Number(e.target.value))}
          />
        </label>
        <br />
        <br />
        <label>
          Nationality:
          <input
            type="text"
            value={driverNationality}
            onChange={(e) => setDriverNationality(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>Upload image</label>
        <br />
        <input type="file" />
        <br />
        <br />
        <button type="submit" className="rounded border-dark shadow">
          Add Driver
        </button>
      </form>
    </section>
  );
}

export default AddDriver;
