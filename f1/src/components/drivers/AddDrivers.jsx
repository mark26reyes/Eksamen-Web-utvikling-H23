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
    window.location.href = "/drivers";
  };

  return (
    <section className="border-bottom border-dark pb-5 w-50">
      <h3 className="pb-4">Register as a new driver</h3>
      <form onSubmit={handleSubmit}>
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
        <label className="d-flex flex-column">
          Image:
          <input name="image" onChange={handleChange} type="file" />
        </label>
        <br />
        <br />
        <button className="btn bg-dark text-light rounded" type="submit">
          Add driver
        </button>
      </form>
    </section>
  );
}

export default AddDriver;
