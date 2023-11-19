import React, { useState } from "react";
import DriverService from "../../services/DriverService";

function AddDriver() {
  const [driverName, setDriverName] = useState("");
  const [driverAge, setDriverAge] = useState("");
  const [driverNationality, setDriverNationality] = useState("");
  const [image, setImage] = useState(null);

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
        setImage(e.currentTarget.files[0]);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming the base URL and image path are known
    const imageUrl = `/images/drivers/${driverName}.png`;

    const newDriver = {
      name: driverName,
      age: driverAge,
      nationality: driverNationality,
      image: imageUrl, // Add the image URL here
    };

    await DriverService.postDriver(newDriver, image);
    setDriverName("");
    setDriverAge("");
    setDriverNationality("");
  };

  return (
    <section>
      <h2>Register as a new driver</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            name="name"
            onChange={handleChange}
            type="text"
            value={driverName}
          />
        </label>
        <br />
        <br />
        <label>
          Age:{" "}
          <input
            name="age"
            onChange={handleChange}
            type="text"
            value={driverAge}
          />
        </label>
        <br />
        <br />
        <label>
          Nationality:{" "}
          <input
            name="nationality"
            onChange={handleChange}
            type="text"
            value={driverNationality}
          />
        </label>
        <br />
        <br />
        <label>
          Image: <input name="image" onChange={handleChange} type="file" />
        </label>
        <br />
        <br />
        <button type="submit">Add Driver</button>
      </form>
    </section>
  );
}

export default AddDriver;
